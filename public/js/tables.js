// ---------------- all eq table --------------------------------------//

$(document).ready(function() {
    var table = $('#equips-table').DataTable({
        pageLength: 2,
        lengthMenu: [1, 2, 3, 4, 5],
        columns: [
            { data: 'assetTag' },
            { data: 'serialNumber' },
            { data: 'equipmentType' },
            { data: 'model' },
            { data: 'location' },
            { data: 'subLocation' },

            // { data: 'action' }
        ]
    });

    $('#equips-table tbody').on('click', '#appButton', function() {
        var data = table.row($(this).parents('tr')).data(); // Get data from clicked row
        console.log(data)


    });




});

// ---------------- all equips table  end--------------------------------------//

// ---------------------------- download ppm table---------------------------//
//


$(document).ready(function() {
    var table = $('#ppm-table').DataTable({
        pageLength: 4,
        lengthMenu: [3, 4],
        columns: [
            { data: 'totalAssets' },
            { data: 'location' },
            { data: 'download' },
        ]
    });

    $('#ppm-table tbody').on('click', '#downloadPdf', function() {
        var data = table.row($(this).parents('tr')).data(); // Get data from clicked row
        console.log(data);
        const location = data.location;

        // Send location data to server using Axios
        axios.get(`/pdf?location=${location}`, { responseType: 'arraybuffer' })
            .then(function(response) {
                console.log(response.data);
                // Create a Blob object from the binary data
                const blob = new Blob([response.data], { type: 'application/pdf' });
                // Create a link element and set its href and download attributes
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);

                const date = new Date().toLocaleDateString().replace(/\//g, "-");
                link.download = `PPM${location}_${date}.pdf`;
                // Click the link to initiate the download
                link.click();
            })
            .catch(function(error) {
                console.log(error);
                // Handle error
            });
    });
});


// ---------------------------download ppm table-------------------------------//