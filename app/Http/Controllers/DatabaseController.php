<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\App;
use App\Models\Call_Detail_Records;
use App\Models\Users;
use Request;
use File;
use Neoxygen\NeoClient\ClientBuilder;
use Plupload;
use Log;

use \App\Http\Classes\Neo4JConnector as Neo4JConnector;
use \App\Http\Classes\Neo4JValidator as Neo4JValidator;

class DatabaseController extends Controller{
    
    public function index() {
        
        return view('admin.database');
    }

    public function uploadCDR() {
        return Plupload::receive('file', function ($file){
            $filename = str_replace(" ","_",$file->getClientOriginalName()) . '_cdr';
            $file->move(storage_path() . '/tmp_db_store/', $filename);

            return 'ready';
        });
    }

    public function uploadProfile() {
        Plupload::receive('file', function ($file){
            $filename = str_replace(" ","_",$file->getClientOriginalName()) . '_profile';
            $file->move(storage_path() . '/tmp_db_store/', $filename);
            return 'ready';
        });
    }

    public function writeToDatabase() {
        ignore_user_abort(true);

        $db_name = Request::all()['name'];
        $neo = new Neo4JConnector('default', 'http', 'localhost', 7474, 'neo4j', 'aiscu');
        $validator = new Neo4JValidator($neo->getConnector());
        while($av = $validator->isWriteLocked()) {
            if(!$av) {
                sleep(rand(1,10));
                continue;
            }
        }
        try {
            $isGranted = $neo->grantLock($db_name);
            if($isGranted) {
                $command = "java -jar java/data-importer/target/data-importer-1.0-SNAPSHOT.jar " . $db_name . ' 2>&1';
                $output = shell_exec($command);
                Log::info($command);
                Log::info($output);
            } else {
                continue;
            }
        } catch (Exception $e) {
            throw new Exception($e);
        } finally {
            $isReleased = $neo->releaseLock();
            if(!$isReleased) {
                throw new Exception("Database can't be unlocked. Manually unlocking is needed.");
            }
        }    
        return 'success';
    }
    
}
?>