$('document').ready(function() {
    var errorSound = new Audio('https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/error.mp3');
       errorSound.volume = 1;
    var successSound = new Audio('https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3');
       successSound.volume = 1;
        /* handle form validation */
        $("#Brochureform").validate({
        ignore: ".ignore",
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: submitFormInv
        });
        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = 'YXBpX3Rva2VuOlJlZEhhdEAyMDA=';
            return 'Basic ' + hash;
        }
        /* handle form submit */
        function submitFormInv() {
            var data = $("#Brochureform").serialize();
            var urlend = 'aHR0cHM6Ly90aG91Z2h0aW50ZXJhY3QuY29tL3Byb2plY3RzL2FqYXktc2NyaXB0cy9BUEkvdjIvbGVhZC9jcmVhdA=';
            $.ajax({
                type: 'POST',
                crossDomain: true,
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                //url: window.btoa(aHR0cHM6Ly90aG91Z2h0aW50ZXJhY3QuY29tL3Byb2plY3RzL2FqYXktc2NyaXB0cy9BUEkvdjIvbGVhZC9jcmVhdA=)/API/v2/lead/create',
                data: data,
                // headers: {"Authorization": "Basic YXBpX3Rva2VuOlJlZEhhdEAyMDA="},
                beforeSend: function() {
                    $("#btn-brochure").css('cursor', 'progress');
                    $("#btn-brochure").attr('disabled','true');
                    $("#btn-brochure").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        // errorSound.play();
                        $("#btn-brochure").html('Submit');
                        $("#btn-brochure").css('cursor', 'pointer');
                        $("#btn-brochure").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                                // errorSound.pause();
                                // errorSound.currentTime = 0;
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-brochure").html('Submit');
                            $("#btn-brochure").css('cursor', 'pointer');
                            $("#btn-brochure").removeAttr('disabled');
                            document.getElementById("Brochureform").reset();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
							if(data.project === 'sai-world-empire'){
								setTimeout(brochureopenempire,1000);
							}else if(data.project === 'sai-world-city'){
								setTimeout(brochureopencity,1000);
							}
                            setTimeout(thankYou,5000);
                    } else {
                            // errorSound.play();
                            $("#btn-brochure").html('Submit');
                            $("#btn-brochure").css('cursor', 'pointer');
                            $("#btn-brochure").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                    // errorSound.pause();
                                    // errorSound.currentTime = 0;
                                }
                            });
        
                    }
                    function thankYou() {
                        //  window.location.reload();
                         window.location.replace("thankyou.php");
                        //window.location.replace("thankyou.php?name="+name+""); // Removing it as with next form submit you will be adding the div again in your code.
                    }
					function brochureopenempire(){
						window.open("https://www.paradisegroup.co.in/assets/pdf/SWE-Brochure.pdf", "_blank");
					}
					function brochureopencity(){
						window.open("https://www.paradisegroup.co.in/assets/pdf/SWC-Brochure.pdf", "_blank");
					}
                }
            });
            return false;
        }
        
        // =========Project Brochure Form ==========
        /* handle form validation */
        $("#popupEnq").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: submitFormBro
        });
        /* handle form submit */
        function submitFormBro() {
            var data = $("#popupEnq").serialize();
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-pop").css('cursor', 'progress');
                    $("#btn-pop").attr('disabled','true');
                    $("#btn-pop").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        
                        $("#btn-pop").html('Submit');
                        $("#btn-pop").css('cursor', 'pointer');
                        $("#btn-pop").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-pop").html('Submit');
                            $("#btn-pop").css('cursor', 'pointer');
                            $("#btn-pop").removeAttr('disabled');
                            document.getElementById("popupEnq").reset();
                            $("#enquiry-form").addClass("hide");
                            $(".modal-backdrop").addClass("hide");
                             //document.getElementById("enquiry-form").modal('hide');
                            //$('#enquiry-form').modal('toggle')
                            //$('#enquiry-form').modal('hide');
                            // document.getElementById('download_brochure').click();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-pop").html('Submit');
                            $("#btn-pop").css('cursor', 'pointer');
                            $("#btn-pop").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        // window.location.reload();
                       window.location.replace("thankyou.php");
                    //    window.location.open(''+data.redirecturl+'');
                        // window.open(''+data.redirecturl+'', "_self");
    
                        //window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code./
                    }
                }
            });
            return false;
        }
        
        //=======Contact Form ==========
       
        /* handle form validation */
        $("#contactForm").validate({
            ignore: ".ignore",
        rules: {
                fname: {
                    required: true,
                    minlength: 2
                },
                lname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
                
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: submitForm
        });
        /* handle form submit */
        function submitForm() {
            var data = $("#contactForm").serialize();
            // var name = document.getElementById("cname").value;
            
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-contact").css('cursor', 'progress');
                    $("#btn-contact").attr('disabled','true');
                    $("#btn-contact").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-contact").html('Submit');
                        $("#btn-contact").css('cursor', 'pointer');
                        $("#btn-contact").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-contact").html('Submit');
                            $("#btn-contact").css('cursor', 'pointer');
                            $("#btn-contact").removeAttr('disabled');
                            document.getElementById("contactForm").reset();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-contact").html('Submit');
                            $("#btn-contact").css('cursor', 'pointer');
                            $("#btn-contact").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        window.location.replace("thankyou.php");
                        // window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }
        
        //=======Carrer Form =========
        /* handle form validation */
        $("#carrerForm").validate({
            ignore: ".ignore",
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
        
                // message:{
                //     required:true,
                // },
                txtCaptcha:{
                    required: true,
                    minlength: 5,
                    maxlength: 6
                },
                resume: {
                required: true,
                extension: "pdf|doc|docx",
                },
                hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
                myfile: { extension: "Only .pdf or .doc files are allowed." },
        
            },
            submitHandler: submitForm3
        });
        /* handle form submit */
        function submitForm3() {
            // var data = $("#careerForm").serialize();
            var form = $('#carrerForm')[0];
                // Create an FormData object
            var data = new FormData(form);
            
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data : data,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                beforeSend: function() {
                    $("#btn-career").css('cursor', 'progress');
                    $("#btn-career").attr('disabled','true');
                    $("#btn-career").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-career").html('Apply Now');
                        $("#btn-career").css('cursor', 'pointer');
                        $("#btn-career").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                                  // window.location.href="rtgs.html";
                            }
                        });
        
                    } else if (data.status === 'success') {
                        successSound.play();
                        $("#btn-career").html('Apply Now');
                        $("#btn-career").css('cursor', 'pointer');
                        $("#btn-career").removeAttr('disabled');
                        document.getElementById("carrerForm").reset();
                        localStorage.setItem('currentURL', data.redirecturl );
                        Swal.fire({
                            icon: 'success',
                            title: "Success",
                            html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                            showConfirmButton: false,
                            timer: 5000
                          });
                        setTimeout(thankYou,5000);
                    } else {
                        $("#btn-career").html('Apply Now');
                        $("#btn-career").css('cursor', 'pointer');
                        $("#btn-career").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: +data.message,
                            timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    }
                    function thankYou() {
                        //  window.location.reload();
                        window.location.replace("thankyou.php"); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }
        
    
        // 
        // $("#customFile").change(function() {
        //     var file = this.files[0];
        //     var fileType = file.type;
        //     var filename = file.name;
        //     var filesize = file.size;
        //     var match = ['application/pdf', 'application/msword', 'application/vnd.ms-office','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        //     if(!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]) || (fileType == match[3]) )){
        //         Swal.fire({
        //             icon: 'error',
        //             title: "Error",
        //             html: "Sorry, only PDF, DOC files are allowed to upload",
        //             // timer: 2000
        //         }).then(okay => {
        //             if (okay) {
        //             }
        //         });
        //         $("#customFile").val('');
        //         $("#filename").text="";
        //         $("#filename").text("Choose file");
        //         return false;
        //     }
            
        //     else if((filesize >=2097152) || (filesize ==0) ){
        //         Swal.fire({
        //             icon: 'error',
        //             title: "Error",
        //             html: "File too large. File must be less than 2 megabytes",
        //             // timer: 2000
        //         }).then(okay => {
        //             if (okay) {
        //             }
        //         });
        //         $("#customFile").val('');
        //         $("#filename").text="";
        //         $("#filename").text("Choose file");
        //         return false;
        //     }
        //     else{
        //         $("#filename").text="+name+";
        //         $("#filename").text(this.files[0].name);
        //     }
        // });
        
        // =========CP Form ==========
        /* handle form validation */
        $("#cpForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:6,
                },
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: submitCP
        });
        /* handle form submit */
        function submitCP() {
            var data = $("#cpForm").serialize();
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-cp").css('cursor', 'progress');
                    $("#btn-cp").attr('disabled','true');
                    $("#btn-cp").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-cp").html('Submit');
                        $("#btn-cp").css('cursor', 'pointer');
                        $("#btn-cp").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-cp").html('Submit');
                            $("#btn-cp").css('cursor', 'pointer');
                            $("#btn-cp").removeAttr('disabled');
                            document.getElementById("cpForm").reset();
                            // document.getElementById('download_brochure').click();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-cp").html('Submit');
                            $("#btn-cp").css('cursor', 'pointer');
                            $("#btn-cp").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        window.location.replace("thankyou.php");
                    //    window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code./
                    }
                }
            });
            return false;
        }
        
         /* handle form validation */
        $("#referForm").validate({
            ignore: ".ignore",
        rules: {
                fname: {
                    required: true,
                    minlength: 2
                },
                lname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                // mobile:{
                //     required:true,
                //     minlength:10,
                //     maxlength:10
                // },
                
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                // mobile: { minlength: "please enter a valid phone number" },
                // mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: submitreferForm
        });
        /* handle form submit */
        function submitreferForm() {
            var data = $("#referForm").serialize();
            // var name = document.getElementById("cname").value;
            
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-contact").css('cursor', 'progress');
                    $("#btn-contact").attr('disabled','true');
                    $("#btn-contact").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-contact").html('Submit');
                        $("#btn-contact").css('cursor', 'pointer');
                        $("#btn-contact").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-contact").html('Submit');
                            $("#btn-contact").css('cursor', 'pointer');
                            $("#btn-contact").removeAttr('disabled');
                            document.getElementById("referForm").reset();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-contact").html('Submit');
                            $("#btn-contact").css('cursor', 'pointer');
                            $("#btn-contact").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        window.location.replace("thankyou.php");
                        // window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }
    
    
        /* handle form validation */
        $("#Projectfrm").validate({
            ignore: ".ignore",
        rules: {
                fname: {
                    required: true,
                    minlength: 2
                },
                lname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
                
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: Projectfrm
        });
        /* handle form submit */
        function Projectfrm() {
            var data = $("#Projectfrm").serialize();
            // var name = document.getElementById("cname").value;
            
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-project").css('cursor', 'progress');
                    $("#btn-project").attr('disabled','true');
                    $("#btn-project").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-project").html('Submit');
                        $("#btn-project").css('cursor', 'pointer');
                        $("#btn-project").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-project").html('Submit');
                            $("#btn-project").css('cursor', 'pointer');
                            $("#btn-project").removeAttr('disabled');
                            document.getElementById("Projectfrm").reset();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-project").html('Submit');
                            $("#btn-project").css('cursor', 'pointer');
                            $("#btn-project").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        window.location.replace("thankyou.php");
                        // window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }
    
    
        
         /* handle form validation */
         $("#commoenquieryfrm").validate({
            ignore: ".ignore",
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10,
                },
                iagreee: {
                    required: true,
                },
                
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: commoenquieryfrm
        });
        /* handle form submit */
        function commoenquieryfrm() {
            var data = $("#commoenquieryfrm").serialize();
            // var name = document.getElementById("cname").value;
            
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-commoenquieryfrm").css('cursor', 'progress');
                    $("#btn-commoenquieryfrm").attr('disabled','true');
                    $("#btn-commoenquieryfrm").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-commoenquieryfrm").html('Submit');
                        $("#btn-commoenquieryfrm").css('cursor', 'pointer');
                        $("#btn-commoenquieryfrm").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-commoenquieryfrm").html('Submit');
                            $("#btn-commoenquieryfrm").css('cursor', 'pointer');
                            $("#btn-commoenquieryfrm").removeAttr('disabled');
                            document.getElementById("commoenquieryfrm").reset();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-commoenquieryfrm").html('Submit');
                            $("#btn-commoenquieryfrm").css('cursor', 'pointer');
                            $("#btn-commoenquieryfrm").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        window.location.replace("thankyou.php");
                        // window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }


        /* handle form validation */
        $("#floorplanfrm").validate({
            ignore: ".ignore",
        rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                lname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
                
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: floorplanfrm
        });
        /* handle form submit */
        function floorplanfrm() {
            var data = $("#floorplanfrm").serialize();
            // var name = document.getElementById("cname").value;
            
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-floorplanfrm").css('cursor', 'progress');
                    $("#btn-floorplanfrm").attr('disabled','true');
                    $("#btn-floorplanfrm").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-floorplanfrm").html('Submit');
                        $("#btn-floorplanfrm").css('cursor', 'pointer');
                        $("#btn-floorplanfrm").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-floorplanfrm").html('Submit');
                            $("#btn-floorplanfrm").css('cursor', 'pointer');
                            $("#btn-floorplanfrm").removeAttr('disabled');
                            document.getElementById("floorplanfrm").reset();
                            $("#floorplan-form").addClass("hide");
                            $(".modal-backdrop").addClass("hide");
                            //document.getElementById("floor-enquiry-form").modal('hide');
                            //$('#floor-enquiry-form').modal('toggle')
                            // $('#floor-enquiry-form').modal('hide');
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-floorplanfrm").html('Submit');
                            $("#btn-floorplanfrm").css('cursor', 'pointer');
                            $("#btn-floorplanfrm").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        //    window.location.open(''+data.redirecturl+'');
                        // window.open(''+data.redirecturl+'', "_self");
                        window.location.replace(''+data.redirecturl+'');
                        window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }
        
    
        // SiteVisit Form
    
    
            // =========Project Brochure Form ==========
        /* handle form validation */
        $("#SitiveVisitForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10
                },
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: submitFormBro
        });
        /* handle form submit */
        function submitFormBro() {
            var data = $("#SitiveVisitForm").serialize();
            $.ajax({
                type: 'POST',
                url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-sitevisit").css('cursor', 'progress');
                    $("#btn-sitevisit").attr('disabled','true');
                    $("#btn-sitevisit").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-sitevisit").html('Submit');
                        $("#btn-sitevisit").css('cursor', 'pointer');
                        $("#btn-sitevisit").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-sitevisit").html('Submit');
                            $("#btn-sitevisit").css('cursor', 'pointer');
                            $("#btn-sitevisit").removeAttr('disabled');
                            document.getElementById("SitiveVisitForm").reset();
                            $("#bookasitevisit-form").addClass("hide");
                            $(".modal-backdrop").addClass("hide");
                             //document.getElementById("enquiry-form").modal('hide');
                            //$('#enquiry-form').modal('toggle')
                            //$('#enquiry-form').modal('hide');
                            // document.getElementById('download_brochure').click();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-sitevisit").html('Submit');
                            $("#btn-sitevisit").css('cursor', 'pointer');
                            $("#btn-sitevisit").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        // window.location.reload();
                       window.location.replace("thankyou.php?name=sitevisit");
                    //    window.location.open(''+data.redirecturl+'');
                        // window.open(''+data.redirecturl+'', "_self");
    
                        //window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code./
                    }
                }
            });
            return false;
        }

        $("#Brochureform1").validate({
            ignore: ".ignore",
                rules: {
                    name: {
                        required: true,
                        minlength: 4
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    mobile:{
                        required:true,
                        minlength:10,
                        maxlength:10
                    },
               hiddenRecaptcha: {
                        required: function () {
                            if (grecaptcha.getResponse() === '') {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                },
                errorElement: "span",
                errorClass: "error text-danger",
                messages: {
            
                    name: { minlength: "Name at least 4 characters" },
                    email: { email: "please enter a valid email address" },
                    mobile: { minlength: "please enter a valid phone number" },
                    mobile: { maxlength: "please enter a valid phone number 10 digits" },
            
                },
                submitHandler: submitFormInv2
            });
            function make_base_auth(user, password) {
                var tok = user + ':' + password;
                var hash = 'YXBpX3Rva2VuOlJlZEhhdEAyMDA=';
                return 'Basic ' + hash;
            }
            /* handle form submit */
            function submitFormInv2() {
                var data = $("#Brochureform1").serialize();
                var urlend = 'aHR0cHM6Ly90aG91Z2h0aW50ZXJhY3QuY29tL3Byb2plY3RzL2FqYXktc2NyaXB0cy9BUEkvdjIvbGVhZC9jcmVhdA=';
                $.ajax({
                    type: 'POST',
                    crossDomain: true,
                    url: 'https://www.paradisegroup.co.in/form/DoAction.php',
                    //url: window.btoa(aHR0cHM6Ly90aG91Z2h0aW50ZXJhY3QuY29tL3Byb2plY3RzL2FqYXktc2NyaXB0cy9BUEkvdjIvbGVhZC9jcmVhdA=)/API/v2/lead/create',
                    data: data,
                    // headers: {"Authorization": "Basic YXBpX3Rva2VuOlJlZEhhdEAyMDA="},
                    beforeSend: function() {
                        $("#btn-brochure1").css('cursor', 'progress');
                        $("#btn-brochure1").attr('disabled','true');
                        $("#btn-brochure1").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                    },
                    success: function(data) {
                        if (data.status === 'error') {
                            // errorSound.play();
                            $("#btn-brochure1").html('Submit');
                            $("#btn-brochure1").css('cursor', 'pointer');
                            $("#btn-brochure").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: data.message,
                                // timer: 2000
                            }).then(okay => {
                                if (okay) {
                                    // errorSound.pause();
                                    // errorSound.currentTime = 0;
                                }
                            });
            
                        } else if (data.status === 'success') {
                                successSound.play();
                                $("#btn-brochure1").html('Submit');
                                $("#btn-brochure1").css('cursor', 'pointer');
                                $("#btn-brochure1").removeAttr('disabled');
                                document.getElementById("Brochureform1").reset();
                                localStorage.setItem('currentURL', data.redirecturl );
                                Swal.fire({
                                    icon: 'success',
                                    title: "Success",
                                    // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                    showConfirmButton: false,
                                    timer: 5000
                                  });
                                setTimeout(thankYou,5000);
                        } else {
                                // errorSound.play();
                                $("#btn-brochure1").html('Submit');
                                $("#btn-brochure1").css('cursor', 'pointer');
                                $("#btn-brochure1").removeAttr('disabled');
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error",
                                    html: +data.message,
                                    timer: 2000
                                }).then(okay => {
                                    if (okay) {
                                        // errorSound.pause();
                                        // errorSound.currentTime = 0;
                                    }
                                });
            
                        }
                        function thankYou() {
                            //  window.location.reload();
                             window.location.replace("thankyou.php");
                            //window.location.replace("thankyou.php?name="+name+""); // Removing it as with next form submit you will be adding the div again in your code.
                        }
                    }
                });
                return false;
            }

        /* handle form validation */
         $("#CPkitForm").validate({
            ignore: ".ignore",
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                mobile:{
                    required:true,
                    minlength:10,
                    maxlength:10,
                },
                iagreee: {
                    required: true,
                },
                
           hiddenRecaptcha: {
                    required: function () {
                        if (grecaptcha.getResponse() === '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            errorElement: "span",
            errorClass: "error text-danger",
            messages: {
        
                name: { minlength: "Name at least 4 characters" },
                email: { email: "please enter a valid email address" },
                mobile: { minlength: "please enter a valid phone number" },
                mobile: { maxlength: "please enter a valid phone number 10 digits" },
        
            },
            submitHandler: CPkitForm
        });
        /* handle form submit */
        function CPkitForm() {
            var data = $("#CPkitForm").serialize();
            // var name = document.getElementById("cname").value;
            
            $.ajax({
                type: 'POST',
                url: 'form/DoAction.php',
                data: data,
                beforeSend: function() {
                    $("#btn-cpkit").css('cursor', 'progress');
                    $("#btn-cpkit").attr('disabled','true');
                    $("#btn-cpkit").html(' <span class="spinner-grow spinner-grow-sm"></span> Loading..');
                },
                success: function(data) {
                    if (data.status === 'error') {
                        $("#btn-cpkit").html('Submit');
                        $("#btn-cpkit").css('cursor', 'pointer');
                        $("#btn-cpkit").removeAttr('disabled');
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            html: data.message,
                            // timer: 2000
                        }).then(okay => {
                            if (okay) {
                            }
                        });
        
                    } else if (data.status === 'success') {
                            successSound.play();
                            $("#btn-cpkit").html('Submit');
                            $("#btn-cpkit").css('cursor', 'pointer');
                            $("#btn-cpkit").removeAttr('disabled');
                            document.getElementById("CPkitForm").reset();
                            localStorage.setItem('currentURL', data.redirecturl );
                            Swal.fire({
                                icon: 'success',
                                title: "Success",
                                // html: "Thank You, <br> Your enquiry is being processed. Our representative will get in touch with you shortly.",
                                showConfirmButton: false,
                                timer: 5000
                              });
                            setTimeout(thankYou,5000);
                    } else {
                            $("#btn-cpkit").html('Submit');
                            $("#btn-cpkit").css('cursor', 'pointer');
                            $("#btn-cpkit").removeAttr('disabled');
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                html: +data.message,
                                timer: 2000
                            }).then(okay => {
                                if (okay) {
                                }
                            });
        
                    }
                    function thankYou() {
                        window.location.replace("thankyou.php");
                        // window.location.reload(); // Removing it as with next form submit you will be adding the div again in your code.
                    }
                }
            });
            return false;
        }
    })