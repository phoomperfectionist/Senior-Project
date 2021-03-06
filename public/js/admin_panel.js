/**
 *  @file   admin_panel.js
 *
 *  @brief  Admin Page Script
 *
 *
 *  @author Thanaphoom Pungchaichan (pperfectionist)
 *
 */

!function(){
    'use strict';

    var dh = new DateHelper();
    var tmpStorage = {};

    /**  
     *  @brief  Add Button Listener for Preprocessing Section (View Filters)
     *
     *  @return void
     */
    function addPFilterListener() {
        $(".preprocess-filter").on('click', function() {
            var pid = $(this).attr('data-pid');
            var tag = $('#pf-' + pid);
            var props = {
                'database' : tag.attr('data-database'),
                'date' : tag.attr('data-date'),
                'carrier' : tag.attr('data-carrier'),
                'period' : tag.attr('data-period'),
                'noOfIncomingCall' : tag.attr('data-noOfIncomingCall'),
                'noOfOutgoingCall' : tag.attr('data-noOfOutgoingCall'),
                'duration' : tag.attr('data-duration'),
                'days' : tag.attr('data-days'),

            };
            $('#pf-database').html(props.database);
            $('#pf-date').html(props.date);
            $('#pf-carrier').html(props.carrier);
            $('#pf-period').html(props.period);
            $('#pf-noOfIncomingCall').html(props.noOfIncomingCall);
            $('#pf-noOfOutgoingCall').html(props.noOfOutgoingCall);
            $('#pf-duration').html(props.duration);
            $('#pf-days').html(props.days);

            $('#preprocessModal').modal('show');
        });
    }

    /**  
     *  @brief  Add Button Listener for Batch Section (View Filters)
     *
     *  @return void
     */
    function addTFilterListener() {
        $(".table-filter").on('click', function() {
            var tid = $(this).attr('data-tid');
            var tag = $('#tf-' + tid);
            var props = {
                'database' : tag.attr('data-database'),
                'date' : tag.attr('data-date'),
                'carrier' : tag.attr('data-carrier'),
                'period' : tag.attr('data-period'),
                'noOfIncomingCall' : tag.attr('data-noOfIncomingCall'),
                'noOfOutgoingCall' : tag.attr('data-noOfOutgoingCall'),
                'duration' : tag.attr('data-duration'),
                'days' : tag.attr('data-days')
            };
            $('#tf-database').html(props.database);
            $('#tf-date').html(props.date);
            $('#tf-carrier').html(props.carrier);
            $('#tf-period').html(props.period);
            $('#tf-noOfIncomingCall').html(props.noOfIncomingCall);
            $('#tf-noOfOutgoingCall').html(props.noOfOutgoingCall);
            $('#tf-duration').html(props.duration);
            $('#tf-days').html(props.days);

            console.log(props);
            $('#tableModal').modal('show');
        });
    }

    /**  
     *  @brief  Rebind Button Listener for Batch Section (View Filters)
     *
     *  @return void
     */
    function rebindTFilterListener() {
        $(".table-filter").unbind();
        addTFilterListener();

        $('.delete-button').unbind();
        addDeleteButtonListener();
    }

    /**  
     *  @brief  Rebind Button Listener for Preprocessing Section (View Filters)
     *
     *  @return void
     */
    function rebindPFilterListener() {
        $(".preprocess-filter").unbind();
        addPFilterListener();

        $('.delete-button').unbind();
        addDeleteButtonListener();
    }

    /**  
     *  @brief  Initialise Pagination setting for data tables
     *
     *  @return void
     */
    function initPagination() {
        $('#preprocess-table').dataTable({
            // rebind the listeners when page changed
            "fnDrawCallback": function (oSettings) {
                addViewButtonListener();
                addDeleteButtonListener();
                addDownloadButtonListener();
            },
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ records per page",
                "oPaginate": {
                    "sPrevious": "Prev",
                    "sNext": "Next"
                }
            },
            "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [0]
                }
            ]
        });
        jQuery('#preprocess-table_wrapper .dataTables_filter input').addClass("form-control medium"); // modify table search input
        jQuery('#preprocess-table_wrapper .dataTables_length select').addClass("form-control xsmall"); // modify table per page dropdown

        $('#preprocess-progress-table').dataTable({
            "fnDrawCallback": function (oSettings) {
                addViewButtonListener();
                addDeleteButtonListener();
                addDownloadButtonListener();
            },
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ records per page",
                "oPaginate": {
                    "sPrevious": "Prev",
                    "sNext": "Next"
                }
            },
            "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [0]
                }
            ]
        });
        jQuery('#preprocess-progress-table_wrapper .dataTables_filter input').addClass("form-control medium"); // modify table search input
        jQuery('#preprocess-progress-table_wrapper .dataTables_length select').addClass("form-control xsmall"); // modify table per page dropdown


        $('#progress-table').dataTable({
            "fnDrawCallback": function (oSettings) {
                addViewButtonListener();
                addDeleteButtonListener();
                addDownloadButtonListener();
            },
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ records per page",
                "oPaginate": {
                    "sPrevious": "Prev",
                    "sNext": "Next"
                }
            },
            "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [0]
                }
            ],

        });
        jQuery('#progress-table_wrapper .dataTables_filter input').addClass("form-control medium"); // modify table search input
        jQuery('#progress-table_wrapper .dataTables_length select').addClass("form-control xsmall"); // modify table per page dropdown

    }

    /**  
     *  @brief  Convert Array format into Unary Format
     *
     *  @return int - Unary
     */
    function intArrayToUnary(arr, size) {
        var result = '';
        var c = 0;
        for(var idx=0;idx<size;idx+=1) {
            if(idx == arr[c]) {
                result += 1;
                c += 1;
            } else {
                result += 0;
            }
        }
        return result;
    }

    /**  
     *  @brief  Bind listeners and actions to the Preprocess form including create, close, submit action
     *
     *  @return void
     */
    function initPreprocessForm() {
        // hide preprocess form until user clicked on add button
        $('#preprocess-form-wrapper').hide();
        

        // add listener to preprocess form
        // submit button
        $('#submit-preprocess').on('click', function() {
            // submit form
            var days = $('.preprocess-days:checked').map(function(_, el) {
                return $(el).val();
            }).get();
            days = intArrayToUnary(days,7);
            if(days.indexOf('1') < 0) {
                alert('Please select at least one day.');
                return;
            }

            var carriers = $('.preprocess-carriers:checked').map(function(_, el) {
                return $(el).val();
            }).get();
            carriers = intArrayToUnary(carriers,5);
            if(carriers.indexOf('1') < 0) {
                alert('Please select at least one carriers.');
                return;
            }

            var validator = new Validator();

            var durationMin = validator.validateMinRange($('#preprocess-durationFrom').val());
            var durationMax = validator.validateMaxRange($('#preprocess-durationTo').val());
            if(durationMin > durationMax && durationMax !== -1) {
                alert('Minimum duration is exceeded the Maximun duration.');
                return;
            }

            var callsMin = validator.validateMinRange($('#preprocess-callsFrom').val());
            var callsMax = validator.validateMaxRange($('#preprocess-callsTo').val());
            if(callsMin > callsMax && callsMax !== -1) {
                alert('Minimum calls is exceeded the Maximun calls.');
                return;
            }

            var periodMin = validator.validateMinTime($('#preprocess-periodFrom').val());
            var periodMax = validator.validateMaxTime($('#preprocess-periodTo').val());
            if(periodMin > periodMax && periodMax !== -1) {
                alert('Minimum period is exceeded the Maximun period.');
                return;
            }

            var incomingMin = validator.validateMinRange($('#preprocess-incomingFrom').val());
            var incomingMax = validator.validateMaxRange($('#preprocess-incomingTo').val());
            if(incomingMin > incomingMax && incomingMax !== -1) {
                alert('Minimum No. of Incoming is exceeded the Maximun value.');
                return;
            }   

            var outgoingMin = validator.validateMinRange($('#preprocess-outgoingFrom').val());
            var outgoingMax = validator.validateMaxRange($('#preprocess-outgoingTo').val());
            if(outgoingMin > outgoingMax && outgoingMax !== -1) {
                alert('Minimum No. of Outgoing is exceeded the Maximun value.');
                return;
            }           

            var submit = {
                'filters' : {
                    'startDate' : $('#preprocess-date').val(),
                    'callDay' : days,
                    'startTime' : [periodMin, periodMax],
                    'duration' : [durationMin, durationMax],
                    'incoming' : [incomingMin, incomingMax],
                    'outgoing' : [outgoingMin, outgoingMax],
                    'rnCode' : carriers,
                    'priority' : $('#preprocess-priority input[name="preprocess-priority"]:checked').val()
                },
                "database" : $('#preprocess-database').val(),
                'description' : $('#preprocess-description').val(),
                
            }
            console.log('Preprocess Form submission : ');

            tmpStorage = {
                "d" : submit,
                "type" : 'preprocess',
                "database" : $('#preprocess-database').val()
            };
            console.log(submit);
            submitForm();
        });

        // cancel button
        $('#cancel-preprocess').on('click', function() {
            // clear all fields
            $('#preprocess-form')[0].reset();

            // hide preprocess form and show add button
            $('#new-preprocess').show(300);
            $('#preprocess-form-wrapper').hide();
        });

        // add button listener
        $('#new-preprocess').on('click', function() {
            // hide add button and show preprocess form
            $('#new-preprocess').hide();
            $('#preprocess-form-wrapper').show(300);
        });
    }

    /**  
     *  @brief  Bind listeners and actions to the Preprocess form including create, close, submit action
     *
     *  @return void
     */
    function initBatchForm() {
        // hide batch form until user clicked on add button
        $('#batch-form-wrapper').hide();

        // add listener to batch form
        // submit button
        $('#submit-batch').on('click', function() {
            // submit form
            var days = $('.batch-days:checked').map(function(_, el) {
                return $(el).val();
            }).get();
            days = intArrayToUnary(days,7);
            if(days.indexOf('1') < 0) {
                alert('Please select at least one day.');
                return;
            }

            var carriers = $('.batch-carriers:checked').map(function(_, el) {
                return $(el).val();
            }).get();
            carriers = intArrayToUnary(carriers,5);
            if(carriers.indexOf('1') < 0) {
                alert('Please select at least one carriers.');
                return;
            }

            var validator = new Validator();

            var durationMin = validator.validateMinRange($('#batch-durationFrom').val());
            var durationMax = validator.validateMaxRange($('#batch-durationTo').val());
            if(durationMin > durationMax && durationMax !== -1) {
                alert('Minimum duration is exceeded the Maximun duration.');
                return;
            }

            var callsMin = validator.validateMinRange($('#batch-callsFrom').val());
            var callsMax = validator.validateMaxRange($('#batch-callsTo').val());
            if(callsMin > callsMax && callsMax !== -1) {
                alert('Minimum calls is exceeded the Maximun calls.');
                return;
            }

            var periodMin = validator.validateMinTime($('#batch-periodFrom').val());
            var periodMax = validator.validateMaxTime($('#batch-periodTo').val());
            if(periodMin > periodMax && periodMax !== -1) {
                alert('Minimum period is exceeded the Maximun period.');
                return;
            }

            var incomingMin = validator.validateMinRange($('#batch-incomingFrom').val());
            var incomingMax = validator.validateMaxRange($('#batch-incomingTo').val());
            if(incomingMin > incomingMax && incomingMax !== -1) {
                alert('Minimum No. of Incoming is exceeded the Maximun value.');
                return;
            }   

            var outgoingMin = validator.validateMinRange($('#batch-outgoingFrom').val());
            var outgoingMax = validator.validateMaxRange($('#batch-outgoingTo').val());
            if(outgoingMin > outgoingMax && outgoingMax !== -1) {
                alert('Minimum No. of Outgoing is exceeded the Maximun value.');
                return;
            } 

            var submit = {
                'filters' : {
                    'startDate' : $('#batch-year').val() + $('#batch-month').val() + $('#batch-period').val(),
                    'callDay' : days,
                    'startTime' : [periodMin, periodMax],
                    'duration' : [durationMin, durationMax],
                    'incoming' : [incomingMin, incomingMax],
                    'outgoing' : [outgoingMin, outgoingMax],
                    'rnCode' : carriers
                },
                'database' : $('#batch-database').val(),
                'description' : $('#batch-description').val()
            }
            tmpStorage = {
                "d" : submit,
                "type" : 'batch',
                "database" : $('#batch-database').val()
            };
            submitForm();
        });

        // cancel button
        $('#cancel-batch').on('click', function() {
            // clear all fields
            $('#batch-form')[0].reset();

            // hide batch form and show add button
            $('#new-batch').show(300);
            $('#batch-form-wrapper').hide();

            
        });

        // add button listener
        $('#new-batch').on('click', function() {
            // clear all fields
            $('#batch-form')[0].reset();

            // hide add button and show batch form
            $('#new-batch').hide();
            $('#batch-form-wrapper').show(300);
        });
    }

    /**  
     *  @brief  Add masking to the input form including time mask and interger mask
     *
     *  @return void
     */
    function addInputFormMasking() {
        var notOverTwentyFour = function(val) {
            return parseFloat(val) > 23.59 ? '23.59' : '00.00';
        }
        $('.time-mask').mask('00.00',  {
            onKeyPress: function(val, e, field, options) {
                field.mask(notOverTwentyFour.apply({}, arguments), options);
            },
            clearIfNotMatch: true

        });
        $('.integer-mask').mask("#", {reverse: true})
    }


    /**
     *  @brief  Basic setuo for AJAX call.
     *
     *  This function must be called everytime before using ajax call.
     *  This function contains CSRF generator which will generate
     *  a CSRF token from page cookie.
     *
     *  Note that CSRF must be placed in HTML file that includes this script.
     *  Otherwise, backend side will reject any AJAX call.
     *
     *  @return void
     */
    function ajaxSetup(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    /**  
     *  @brief  Submit form to the server-side and then create new row on the data table if success
     *
     *  @return void
     */
    function submitForm() {
        var d = tmpStorage['d'];
        var type = tmpStorage['type'];
        var db = d['database'];

        ajaxSetup();
        $.ajax({
            type: "POST",
            url: "http://localhost/seniorproject/public/processSetup",
            data : {'filter' : d['filters'], 'type' : type, 'description' : d['description'], 'database' : db},
            success: function(e){
                console.log(e);
                if(type == 'batch') {
                    console.log(e);
                    var f = e['filters'];
                    var idCol = '<td><a href="./analysis/' + e.nid + '">New</a></td>';
                    var dateCol = '<td>' + f['startDate'] + '</td>';
                    var descCol = '<td>'+d['description']+'</td>';
                    var sizeCol = '<td class="text-center">-</td>';
                    var customerCol = '<td class="text-center">-</td>';
                    var actionCol = '<td><div class="label label-default label-mini table-filter margin-right-4" href="#" data-toggle="modal" data-tid="'+e.nid+'"><i class="fa fa-info"></i></div><span id="tf-'+e.nid+'" data-date="'+ e['filters']['startDate'] +'" data-noOfCall="'+'"data-duration="'+ e['filters']['duration'] +'" data-period="'+ e['filters']['startTime'] +'" data-carrier="'+ e['filters']['rnCode'] +'" data-days="' + e['filters']['callDay'] + '" data-noOfIncomingCall="'+ e['filters']['incoming'] + '" data-noOfOutgoingCall="'+ e['filters']['outgoing'] + '" data-database="'+db+'"></span><div class="label label-default label-mini margin-right-4" id="tf-view-'+e.nid+'"><i class="fa fa-eye"></i></div><div class="label label-default label-mini margin-right-4" id="tf-download-'+e.nid+'"><i class="fa fa-download"></i></div><div class="label label-danger label-mini delete-button" data-tid="'+e.nid+'" data-type="batch"><i class="fa fa-times"></i></div></td>';
                    var statusCol = '<td><span class="label label-warning label-mini" id="tf-status-'+e.nid+'">Processing</span></td>';
                    $('#progress-table-body').append('<tr id="row-p-'+e.nid+'">' + idCol + dateCol + descCol + customerCol + sizeCol + actionCol + statusCol + '</tr>');


                    // hide batch form and show add button
                    $('#new-batch').show(300);
                    $('#batch-form-wrapper').hide();
                    rebindTFilterListener();
                    $.ajax({
                        type: "POST",
                        url: "http://localhost/seniorproject/public/startProcess",
                        data : {'filter' : d['filters'], 'type' : type, 'description' : d['description'], 'nid' : e.nid, 'database' : db},
                        success: function(e){},
                        error: function(rs, e){
                            console.log(rs.responseText);
                        }
                    });
                } else if(type == 'preprocess') {
                    console.log(e);
                    var f = e['filters'];
                    var idCol = '<td><a href="#">New</a></td>';
                    var descCol = '<td>' + d['description'] + '</td>';
                    var filtersCol = '<td><a href="#" data-toggle="modal" class="preprocess-filter" data-pid="' + e.nid + '"> Click to see filters </a><span id="pf-'+e.nid+'" data-date="'+e['filters']['startDate']+'" data-noOfIncomingCall="'+e['filters']['incoming']+'" data-noOfOutgoingCall="'+e['filters']['outgoing']+'" data-days="'+e['filters']['callDay']+'" data-duration="'+e['filters']['duration']+'" data-period="'+e['filters']['startTime']+'" data-carrier="'+e['filters']['rnCode']+'" data-database="'+db+'"></span></td>';
                    var priorityCol = '<td>' + (d['filters']['priority'] == 3? 'High' : d['filters']['priority'] == 2? 'Medium' : 'Low') + '</td>';
                    var actionCol = '<td><span class="label label-danger label-mini margin-right-4"><i class="fa fa-times"></i></span></td>';
                    $('#preprocess-table-body').append('<tr id="row-p-'+e.nid+'">' + idCol + descCol + filtersCol + priorityCol + actionCol + '</tr>');
                    $('#new-preprocess').show(300);
                    $('#preprocess-form-wrapper').hide();
                    rebindPFilterListener();
                }
            },
            error: function(rs, e){
                console.log(rs.responseText);
            }
        });
    }

    /**  
     *  @brief  Add listener to the delete button on each row in data tables
     *
     *  @return void
     */
    function addDeleteButtonListener() {
        $(".delete-button").on('click', function() {
            var type = $(this).attr('data-type');
            if(type == 'preprocess') {
                var pid = $(this).attr('data-pid');
                deleteData(pid, type);
            } else if(type == 'preprocess-result') {
                var pid = $(this).attr('data-pid');
                deleteData(pid, type);
            } else if(type == 'batch') {
                var tid = $(this).attr('data-tid');
                deleteData(tid, type);
            }
        });
    }


    /**  
     *  @brief  Triggered when user click on delete button - Delete the specific row in the data table with thier data
     *
     *  @params id      ID of the process
                type    type of the process (batch or preprocess) 
     *  @return void
     */
    function deleteData(id, type) {
        ajaxSetup();
        $.ajax({
            type: "POST",
            url: "http://localhost/seniorproject/public/deleteData",
            data : { 'nid' : id, 'type' : type },
            success: function(e){
                if(type == 'batch') {
                    $('#row-b-' + id).remove();
                } else if(type == 'preprocess') {
                    $('#row-p-' + id).remove();
                } else if(type == 'preprocess-result') {
                    $('#row-pr-' + id).remove();
                }
            },
            error: function(rs, e){
                console.log(rs.responseText);
            }
        });
    }

    /**  
     *  @brief  Bind listeners to the view button of each row in the data tables
     *
     *  @return void
     */
    function addViewButtonListener() {
        $(".tf-view, .pf-view").unbind();
        $(".tf-view, .pf-view").on('click', function() {
            var id = $(this).attr('data-id');
            if(id == undefined) return;
            window.location = "analysis/" + id;
        });    
    }

    /**  
     *  @brief  Bind listeners to the download button of each row in the data tables
     *
     *  @return void
     */
    function addDownloadButtonListener() {
        $(".tf-download, .pf-download").unbind();
        $(".tf-download, .pf-download").on('click', function() {
            var id = $(this).attr('data-id');
            $.ajax({
                type: "GET",
                url: "http://localhost/seniorproject/public/exportCSV",
                data : { "pid" : id },
                success: function(e){
                    console.log(e);
                    var export_communities = new Array();
                    for(var i=0; i<e.length; i+= 1){
                        export_communities = export_communities.concat(e[i]);
                    }
                    var converter = new Converter();
                    converter.JSONToCSVConvertor(export_communities, "Call Detail Records", true);
                },
                error: function(rs, e){
                    console.log(rs.responseText);
                    alert('Problem occurs during fetch data.');
                },
            });
        });
    }

    /**  
     *  @brief  Update the status of each process in data tables (Processing --> Ready)
     *
     *  @params freq    interval to check the status in Second
     *  @return void
     */
    function recheckStatus(freq) {
        setInterval(function() {
            $.ajax({
                type: "GET",
                url: "http://localhost/seniorproject/public/checkJobStatus",
                success: function(e){
                    console.log(e);
                    e.forEach(function(ev) {
                        if(ev['status'] == 'Ready') {
                            var jid = ev['jid'];
                            $('#tf-view-' + jid).removeClass('label-default');
                            $('#tf-view-' + jid).addClass('label-primary');

                            $('#tf-download-' + jid).removeClass('label-default');
                            $('#tf-download-' + jid).addClass('label-success');

                            $('#tf-status-' + jid).removeClass('label-warning');
                            $('#tf-status-' + jid).addClass('label-success');
                            $('#tf-status-' + jid).html('Ready');
                        } else if(ev['status'] == 'Failed') {
                            var jid = ev['jid'];
                            $('#tf-view-' + jid).removeClass('label-default');
                            $('#tf-view-' + jid).addClass('label-primary');

                            $('#tf-download-' + jid).removeClass('label-default');
                            $('#tf-download-' + jid).addClass('label-danger');

                            $('#tf-status-' + jid).removeClass('label-warning');
                            $('#tf-status-' + jid).addClass('label-danger');
                            $('#tf-status-' + jid).html('Failed');
                        }
                    });
                },
                error: function(rs, e){
                    console.log(rs.responseText);
                },
            });
        }, freq);
    }

    /**
     *  @brief Main function of this file
     *
     *  @param undefined
     *  @return void
     */
    !function(undefined){
        addPFilterListener();
        addTFilterListener();
        initPagination();
        initPreprocessForm();
        initBatchForm();
        addInputFormMasking();
        addDeleteButtonListener();
        addViewButtonListener();
        addDownloadButtonListener();
        recheckStatus(3000);
    }();

}();

