// ---------------- all eq table --------------------------------------//


$(document).ready(function() {
    var table = $('#equips-table').DataTable({
        serverSide: true, // Enable server-side processing
        ajax: {
            url: '/all', // API endpoint to fetch the data
            type: 'GET',
            data: function (d) {
                // Add pagination parameters to the request
                d.start = d.start || 0; // Starting index of the data
                d.length = d.length || 10; // Number of items per page
                return d;
            }
        },
        pageLength: 2,
        lengthMenu: [1, 2, 3, 4, 5],
        columns: [
            {data: 'assetTag'  },
            { data: 'equipmentType' },
            { data: 'model' },
            { data: 'department' },
            {
                // Custom column for the Repair button
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-link btn-sm repair-button" data-assettag="' + data.assetTag + '" data-bs-toggle="modal" data-bs-target="#repairModal" data-bs-placement="bottom" title="Repair Asset">' +
                            '<span style="font-size: 1.2em;">' +
                                '<i class="fa-solid fa-screwdriver-wrench"></i>' +
                            '</span>' +
                        '</button>';
                }
            },
            {
                // Custom column for the Update button
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-link btn-sm edit-button" data-assettag="' + data.assetTag + '" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-placement="bottom" title="Repair Asset">' +
                            '<span style="font-size: 1.2em;">' +
                                '<i class="fa-regular fa-pen-to-square"></i>' +
                            '</span>' +
                        '</button>';
                }
            }
        ]
    });

   // Event delegation for the Repair button
$('#equips-table tbody').on('click', '.repair-button', function() {
    var assetTag = $(this).data('assettag');
    console.log(assetTag);

    const assetTagInput = document.querySelector('#assetTagInput');
    assetTagInput.value = assetTag;
    console.log(assetTagInput)

    const model = table.row($(this).closest('tr')).data().model;
    $('#randomnTag').text(assetTag); // Set assetTag value inside modal
    $('#randomnModel').text(model);

    $('#repairModal').modal('show');
});

  // Event delegation for the Edit button
  $('#equips-table tbody').on('click', '.edit-button', function() {
    var assetTag = $(this).data('assettag');
    console.log(assetTag);

    const editAssetTagInput = document.querySelector('#editAssetTagInput');
    editAssetTagInput.value = assetTag;
    console.log(editAssetTagInput)

    const editModal = table.row($(this).closest('tr')).data().model;
    $('#editTag').text(assetTag); // Set assetTag value inside modal
    $('#editModel').text(editModal);

    $('exampleModal').modal('show');
});

});




// ---------------- all equips table  end--------------------------------------//

// ---------------------------- download ppm table---------------------------//



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

// =================================Repairs Table All =================//
$(document).ready(function() {
    var table = $('#repairs-table').DataTable({
        pageLength: 2,
        lengthMenu: [1, 2, 3, 4, 5],
        columns: [
            { data: 'assetTag' },
            { data: 'date' },
            { data: 'physicalLocation' },
            { data: 'user' },
            { data: 'jobDescription' },
            { data: 'solution' },
            { data: 'ictOfficer' }
        ]
    });

});

//===========================================repairs table end===============//