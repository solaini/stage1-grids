import idb from 'idb';

idb.open('stage-1', 1, function(upgradeDb){
    var keyValStore = upgradeDb.createObjectStore('keyVal')
});