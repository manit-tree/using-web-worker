let worker = null;

function start_worker() {
    if (typeof Worker !== 'undefined') {
        if (!worker) {
            worker = new Worker('./worker.js'); 
        }   
 
        worker.onmessage = (evt) => {
            console.log(evt.data);
        }

        return worker;
    }

    return null;
 }

$.ready(() => {
    console.log('app ready!');

    let app = $('#app');

    app.on('click', evt => {
        let el = evt.target;

        if (el.matches('a[data-cmd]')) {
            evt.preventDefault();

            let cmd = el.getAttribute('data-cmd');

            if (cmd == 'start-worker') {
                worker = start_worker();
            } else if (cmd == 'stop-worker') {
                if (worker) {
                    worker.terminate();
                    worker = null;
                    console.log('worker is terminated!');
                }
            }
        }
    })
})