const cluster = require("cluster");
const os      = require("os");

const CPUS = os.cpus();

if (cluster.isMaster) {
    // get os number of cores and create a cluster per core
    CPUS.forEach(function() {
        cluster.fork()
    });

    cluster.on("listening", (worker) => {
        console.log("Cluster %d connected", worker.process.pid);
    });
    cluster.on("disconnect", (worker) => {
        console.log("Cluster %d disconnected", worker.process.pid);
    });
    cluster.on("exit", (worker) => {
        console.log("Cluster %d is dead", worker.process.pid);

        // Make sure to start a new cluster if one fails
        cluster.fork();
    });
} else {
    require("./server");
}