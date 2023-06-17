// ---------------- all eq table --------------------------------------//


$(document).ready(function() {
  var table = $('#equips-table').DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: '/all', // API endpoint for server-side processing
        type: 'GET', // Use POST method for server-side processing
      },
        pageLength:2,
        lengthMenu:[1,2,3,4,5],
      columns: [
        { data: 'assetTag', className: 'fs-6' },
        { data: 'equipmentType', className: 'fs-6' },
        { data: 'model', className: 'fs-6' },
        { data: 'department', className: 'fs-6 text-center' },
        {
          data: null,
          className: 'fs-6 text-center',
          render: function(data, type, row) {
            return '<button class="btn btn-link btn-sm" id="repair" data-bs-toggle="modal" data-bs-patientid="' + data.assetTag + '" data-bs-target="#repairModal" data-bs-placement="bottom" title="Repair Asset">' +
              '<span style="font-size: 1.2em;">' +
              '<i class="fa-solid fa-screwdriver-wrench"></i>' +
              '</span>' +
              '</button>';
          }
        },
        {
          data: null,
          className: 'fs-6 text-center',
          render: function(data, type, row) {
            return '<button class="btn btn-link btn-sm" id="edit" data-bs-toggle="modal" data-bs-patientid="' + data.assetTag + '" data-bs-target="#exampleModal" data-bs-placement="bottom" title="Repair Asset">' +
              '<span style="font-size: 1.2em;">' +
              '<i class="fa-regular fa-pen-to-square"></i>' +
              '</span>' +
              '</button>';
          }
        }
      ]
    });

 // Event delegation for the Repair button
$('#equips-table tbody').on('click', '#repair', function() {
  var assetTag = $(this).data('bs-patientid');
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
$('#equips-table tbody').on('click', '#edit', function() {
  var assetTag = $(this).data('bs-patientid');
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