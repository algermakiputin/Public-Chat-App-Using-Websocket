 <?php
require __DIR__ . '/vendor/autoload.php'; 
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class Chat implements MessageComponentInterface {
    protected $clients; 
    protected $users = [];

    public function __construct() {
        $this->clients = new \SplObjectStorage;

    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        
        $this->clients->attach($conn); 
        $conn->send(json_encode(['type' => 'user_list', 'users' => $this->users]));
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        $data = json_decode($msg);
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');


        if ($data->type == "new_connection") {
            if ($this->add_user($data->user)) {
                $msg = "['type':'new_connection', 'user': '$data->user']";
            }
        }
       
        foreach ($this->clients as $client) {
            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
            
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }


    public function add_user($id) {

        $user_ids = array_column($this->users, 'id');
       
        if ( !in_array($id, $user_ids) ) {

            array_push($this->users, ['id' => $id, 'online' => 1]);
            //echo "new user connected"; 
            //print_r($this->users);
            return true;

        } 
 
        echo "no new connection";
        return false;
    }

    public function remove_user() {

        foreach ($this->users as $key => $user) {

            if ($user->id == $id) {
                unset($this->users[$key]);
            }
        }
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();