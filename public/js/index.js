$(document).ready(function() {
		
			$('ul a').click(function() {
			var $anchor = $(this);
			
			$('html, body').animate({
			//scrollTop: $($anchor.attr('href')).offset().top
			}, 2000);
			return false;
			helpers : {
			}
			});

    /*params = {
        mask:$('#images-mask'),
        elements:$('#images-mask img'),
        prevbtn:$('#prev-button'),
        nextbtn:$('#next-button'),
        displaytype:'column',
        elementsByRow:3,
        rowsDisplayed:2
    };
    $('#gallery').magicScroller( params );*/

    getLatestPhotos()
    loadEffect()
			}); //end


function loadEffect(){

        var $iw_thumbs			= $('#iw_thumbs'),
            $iw_ribbon			= $('#iw_ribbon'),
            $iw_ribbon_close	= $iw_ribbon.children('span.iw_close'),
            $iw_ribbon_zoom		= $iw_ribbon.children('span.iw_zoom');

        ImageWall	= (function() {
            // window width and height
            var w_dim,
            // index of current image
                current				= -1,
                isRibbonShown		= false,
                isFullMode			= false,
            // ribbon / images animation settings
                ribbonAnim			= {speed : 500, easing : 'easeOutExpo'},
                imgAnim				= {speed : 400, easing : 'jswing'},
            // init function : call masonry, calculate window dimentions, initialize some events
                init				= function() {
                    $iw_thumbs.imagesLoaded(function(){
                        $iw_thumbs.masonry({
                            isAnimated	: true
                        });
                    });
                    getWindowsDim();
                    initEventsHandler();
                },
            // calculate window dimentions
                getWindowsDim		= function() {
                    w_dim = {
                        width	: $(window).width(),
                        height	: $(window).height()
                    };
                },
            // initialize some events
                initEventsHandler	= function() {

                    // click on a image
                    $iw_thumbs.delegate('li', 'click', function() {
                        if($iw_ribbon.is(':animated')) return false;

                        var $el = $(this);

                        if($el.data('ribbon')) {
                            showFullImage($el);
                        }
                        else if(!isRibbonShown) {
                            isRibbonShown = true;

                            $el.data('ribbon',true);

                            // set the current
                            current = $el.index();

                            showRibbon($el);
                        }
                    });

                    // click ribbon close
                    $iw_ribbon_close.bind('click', closeRibbon);

                    // on window resize we need to recalculate the window dimentions
                    $(window).bind('resize', function() {
                        getWindowsDim();
                        if($iw_ribbon.is(':animated'))
                            return false;
                        closeRibbon();
                    })
                        .bind('scroll', function() {
                            if($iw_ribbon.is(':animated'))
                                return false;
                            closeRibbon();
                        });

                },
                showRibbon			= function($el) {
                    var	$img	= $el.children('img'),
                        $descrp	= $img.next();

                    // fadeOut all the other images
                    $iw_thumbs.children('li').not($el).animate({opacity : 0.1}, imgAnim.speed);

                    // increase the image z-index, and set the height to 100px (default height)
                    $img.css('z-index', 100)
                        .data('originalHeight',$img.height())
                        .stop()
                        .animate({
                            height 		: '100px'
                        }, imgAnim.speed, imgAnim.easing);

                    // the ribbon will animate from the left or right
                    // depending on the position of the image
                    var ribbonCssParam 		= {
                            top	: $el.offset().top - $(window).scrollTop() - 6 + 'px'
                        },
                        descriptionCssParam,
                        dir;

                    if( $el.offset().left < (w_dim.width / 2) ) {
                        dir = 'left';
                        ribbonCssParam.left 	= 0;
                        ribbonCssParam.right 	= 'auto';
                    }
                    else {
                        dir = 'right';
                        ribbonCssParam.right 	= 0;
                        ribbonCssParam.left 	= 'auto';
                    }

                    $iw_ribbon.css(ribbonCssParam)
                        .show()
                        .stop()
                        .animate({width : '100%'}, ribbonAnim.speed, ribbonAnim.easing, function() {
                            switch(dir) {
                                case 'left' :
                                    descriptionCssParam		= {
                                        'left' 			: $img.outerWidth(true) + 'px',
                                        'text-align' 	: 'left'
                                    };
                                    break;
                                case 'right' :
                                    descriptionCssParam		= {
                                        'left' 			: '-200px',
                                        'text-align' 	: 'right'
                                    };
                                    break;
                            };
                            $descrp.css(descriptionCssParam).fadeIn();
                            // show close button and zoom
                            $iw_ribbon_close.show();
                            $iw_ribbon_zoom.show();
                        });

                },
            // close the ribbon
            // when in full mode slides in the middle of the page
            // when not slides left
                closeRibbon			= function() {
                    isRibbonShown 	= false

                    $iw_ribbon_close.hide();
                    $iw_ribbon_zoom.hide();

                    if(!isFullMode) {

                        // current wall image
                        var $el	 		= $iw_thumbs.children('li').eq(current);

                        resetWall($el);

                        // slide out ribbon
                        $iw_ribbon.stop()
                            .animate({width : '0%'}, ribbonAnim.speed, ribbonAnim.easing);

                    }
                    else {
                        $iw_ribbon.stop().animate({
                            opacity		: 0.8,
                            height 		: '0px',
                            marginTop	: w_dim.height/2 + 'px' // half of window height
                        }, ribbonAnim.speed, function() {
                            $iw_ribbon.css({
                                'width'		: '0%',
                                'height'	: '126px',
                                'margin-top': '0px'
                            }).children('img').remove();
                        });

                        isFullMode	= false;
                    }
                },
                resetWall			= function($el) {
                    var $img		= $el.children('img'),
                        $descrp		= $img.next();

                    $el.data('ribbon',false);

                    // reset the image z-index and height
                    $img.css('z-index',1).stop().animate({
                        height 		: $img.data('originalHeight')
                    }, imgAnim.speed,imgAnim.easing);

                    // fadeOut the description
                    $descrp.fadeOut();

                    // fadeIn all the other images
                    $iw_thumbs.children('li').not($el).animate({opacity : 1}, imgAnim.speed);
                },
                showFullImage		= function($el) {
                    isFullMode	= true;

                    $iw_ribbon_close.hide();

                    var	$img	= $el.children('img'),
                        large	= $img.data('img'),

                    // add a loading image on top of the image
                        $loading = $('<span class="iw_loading"></span>');

                    $el.append($loading);

                    // preload large image
                    $('<img/>').load(function() {
                        var $largeImage	= $(this);

                        $loading.remove();

                        $iw_ribbon_zoom.hide();

                        resizeImage($largeImage);

                        // reset the current image in the wall
                        resetWall($el);

                        // animate ribbon in and out
                        $iw_ribbon.stop().animate({
                            opacity		: 1,
                            height 		: '0px',
                            marginTop	: '63px' // half of ribbons height
                        }, ribbonAnim.speed, function() {
                            // add the large image to the DOM
                            $iw_ribbon.prepend($largeImage);

                            $iw_ribbon_close.show();

                            $iw_ribbon.animate({
                                height 		: '100%',
                                marginTop	: '0px',
                                top			: '0px'
                            }, ribbonAnim.speed);
                        });
                    }).attr('src',large);

                },
                resizeImage			= function($image) {
                    var widthMargin		= 100,
                        heightMargin 	= 100,

                        windowH      	= w_dim.height - heightMargin,
                        windowW      	= w_dim.width - widthMargin,
                        theImage     	= new Image();

                    theImage.src     	= $image.attr("src");

                    var imgwidth     	= theImage.width,
                        imgheight    	= theImage.height;

                    if((imgwidth > windowW) || (imgheight > windowH)) {
                        if(imgwidth > imgheight) {
                            var newwidth 	= windowW,
                                ratio 		= imgwidth / windowW,
                                newheight 	= imgheight / ratio;

                            theImage.height = newheight;
                            theImage.width	= newwidth;

                            if(newheight > windowH) {
                                var newnewheight 	= windowH,
                                    newratio 		= newheight/windowH,
                                    newnewwidth 	= newwidth/newratio;

                                theImage.width 		= newnewwidth;
                                theImage.height		= newnewheight;
                            }
                        }
                        else {
                            var newheight 	= windowH,
                                ratio 		= imgheight / windowH,
                                newwidth 	= imgwidth / ratio;

                            theImage.height = newheight;
                            theImage.width	= newwidth;

                            if(newwidth > windowW) {
                                var newnewwidth 	= windowW,
                                    newratio 		= newwidth/windowW,
                                    newnewheight 	= newheight/newratio;

                                theImage.height 	= newnewheight;
                                theImage.width		= newnewwidth;
                            }
                        }
                    }

                    $image.css({
                        'width'			: theImage.width + 'px',
                        'height'		: theImage.height + 'px',
                        'margin-left'	: -theImage.width / 2 + 'px',
                        'margin-top'	: -theImage.height / 2 + 'px'
                    });
                };

            return {init : init};
        })();

        ImageWall.init();

}


this.imagePreview = function(){
    /* CONFIG */

    xOffset = 10;
    yOffset = 30;

    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result

    /* END CONFIG */
    $("a.preview").hover(function(e){
            this.t = this.title;
            this.title = "";
            var c = (this.t != "") ? "<br/>" + this.t : "";
            $("body").append("<p id='preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</p>");
            $("#preview")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px")
                .fadeIn("fast");
        },
        function(){
            this.title = this.t;
            $("#preview").remove();
        });
    $("a.preview").mousemove(function(e){
        $("#preview")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
};


// starting the script on page load
/*$(document).ready(function(){
    imagePreview();
});*/


function getLatestPhotos() {
    $.ajax( {
        url: '/photos',
        type:'get',
        success:function(data) {
            //alert(data.photos)
            var sData =  JSON.stringify(data);
            var jData =  JSON.parse(sData);
            //alert(jData["photos"])
            var images = ""
            for (var i in jData["photos"]) {
                //alert (i)
                 //images += '<li><a href="'+ jData["photos"][i]["photo_addr"] +'" class="preview"><img class="img" src="'+ jData["photos"][i]["photo_addr"] +'" alt="" /></a></li>';

                 images += '<li><img  src="'+ jData["photos"][i]["photo_addr"] +'" data-img= "'+ jData["photos"][i]["photo_addr"] +'" alt="123" /><div><h2>Serenity</h2><p>Far far away, behind the word mountains there live the blind texts.</p></div></li>';
            }
            $('#iw_thumbs').html($(images));
            // starting the script on page load
            $(document).ready(function(){
                imagePreview();
            });
        },
        error:function() {
            alert("Get Images error");
        }
    });
}

    //var postPhotoWin;
    //var postPhotoForm;
    //
    //$(function () {
    //    postPhotoWin = $('#post-window').window({
    //        width: 500,
    //        height: 250,
    //        collapsible:false,
    //        minimizable:false,
    //        maximizable:false,
    //        closed: true,
    //        modal: true,
    //        shadow: false
    //    });
    //    postPhotoForm = postPhotoWin.find('form');
    //
    //
    //});
    //
    //function postNewPhotoWindow() {
    //    postPhotoWin.window('open');
    //    postPhotoForm.form('clear');
    //}
    //
    //function closePostWindow() {
    //    postPhotoForm.form('clear');
    //    postPhotoWin.window('close');
    //}
    //
    //
    //$(document).ready(function(){
    //    $('form').submit(function(ev){
    //        $('.overlay').show();
    //        $(window).scrollTop(0);
    //        return upload_images_selected(ev, ev.target);
    //    })
    //})
    //function add_new_file_uploader(addBtn) {
    //    var currentRow = $(addBtn).parent().parent();
    //    var newRow = $(currentRow).clone();
    //    $(newRow).find('.previewImage, .imagePreviewTable').hide();
    //    $(newRow).find('.removeButton').show();
    //    $(newRow).find('table.imagePreviewTable').find('tr').remove();
    //    $(newRow).find('input.multipleImageFileInput').val('');
    //    $(addBtn).parent().parent().parent().append(newRow);
    //}
    //
    //function remove_file_uploader(removeBtn) {
    //    $(removeBtn).parent().parent().remove();
    //}
    //
    //function show_image_preview(file_selector) {
    //    //files selected using current file selector
    //    var files = file_selector.files;
    //    //Container of image previews
    //    var imageContainer = $(file_selector).next('table.imagePreviewTable');
    //    //Number of images selected
    //    var number_of_images = files.length;
    //    //Build image preview row
    //    var imagePreviewRow = $('<tr class="imagePreviewRow_0"><td valign=top style="width: 510px;"></td>' +
    //    '<td valign=top><input type="button" value="X" title="Remove Image" class="removeImageButton" imageIndex="0" onclick="remove_selected_image(this)" /></td>' +
    //    '</tr> ');
    //    //Add image preview row
    //    $(imageContainer).html(imagePreviewRow);
    //    if (number_of_images > 1) {
    //        for (var i =1; i<number_of_images; i++) {
    //            /**
    //             *Generate class name of the respective image container appending index of selected images,
    //             *sothat we can match images selected and the one which is previewed
    //             */
    //            var newImagePreviewRow = $(imagePreviewRow).clone().removeClass('imagePreviewRow_0').addClass('imagePreviewRow_'+i);
    //            $(newImagePreviewRow).find('input[type="button"]').attr('imageIndex', i);
    //            $(imageContainer).append(newImagePreviewRow);
    //        }
    //    }
    //    for (var i = 0; i < files.length; i++) {
    //        var file = files[i];
    //        /**
    //         * Allow only images
    //         */
    //        var imageType = /image.*/;
    //        if (!file.type.match(imageType)) {
    //            continue;
    //        }
    //
    //        /**
    //         * Create an image dom object dynamically
    //         */
    //        var img = document.createElement("img");
    //
    //        /**
    //         * Get preview area of the image
    //         */
    //        var preview = $(imageContainer).find('tr.imagePreviewRow_'+i).find('td:first');
    //
    //        /**
    //         * Append preview of selected image to the corresponding container
    //         */
    //        preview.append(img);
    //
    //        /**
    //         * Set style of appended preview(Can be done via css also)
    //         */
    //        preview.find('img').addClass('previewImage').css({'max-width': '500px', 'max-height': '500px'});
    //
    //        /**
    //         * Initialize file reader
    //         */
    //        var reader = new FileReader();
    //        /**
    //         * Onload event of file reader assign target image to the preview
    //         */
    //        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    //        /**
    //         * Initiate read
    //         */
    //        reader.readAsDataURL(file);
    //    }
    //    /**
    //     * Show preview
    //     */
    //    $(imageContainer).show();
    //}
    //
    //function remove_selected_image(close_button)
    //{
    //    /**
    //     * Remove this image from preview
    //     */
    //    var imageIndex = $(close_button).attr('imageindex');
    //    $(close_button).parents('.imagePreviewRow_' + imageIndex).remove();
    //}
    //
    //function upload_images_selected(event, formObj)
    //{
    //    event.preventDefault();
    //    //Get number of images
    //    var imageCount = $('.previewImage').length;
    //    //Get all multi select inputs
    //    var fileInputs = document.querySelectorAll('.multipleImageFileInput');
    //    //Url where the image is to be uploaded
    //    var url= "/photos/";
    //    //Get number of inputs
    //    var number_of_inputs = $(fileInputs).length;
    //    var inputCount = 0;
    //
    //    // Create a new FormData object.
    //    var formData = new FormData();
    //    //Iterate through each file selector input
    //    $(fileInputs).each(function(index, input){
    //
    //        fileList = input.files;
    //
    //        //Extra parameters can be added to the form data object
    //        formData.append('bulk_upload', '1');
    //        formData.append('username', $('input[name="username"]').val());
    //        //Iterate throug each images selected by each file selector and find if the image is present in the preview
    //        for (var i = 0; i < fileList.length; i++) {
    //            if ($(input).next('.imagePreviewTable').find('.imagePreviewRow_'+i).length != 0) {
    //                var file = fileList[i];
    //                // Check the file type.
    //                if (!file.type.match('image.*')) {
    //                    continue;
    //                }
    //                // Add the file to the request.
    //                formData.append('image_uploader_multiple[' +(inputCount++)+ ']', file, file.name);
    //            }
    //        }
    //
    //    })
    //
    //    // Set up the request.
    //    var xhr = new XMLHttpRequest();
    //    xhr.open('POST', url, true);
    //    xhr.onload = function () {
    //        if (xhr.status === 200) {
    //               //alert(xhr.responseText)
    //               var jsonResponse = JSON.parse(xhr.responseText);
    //               //alert(jsonResponse["stat"])
    //                if (jsonResponse["stat"] == "ok") {
    //                    /*$(jsonResponse.file_info).each(function(){
    //                        //Iterate through response and find data corresponding to each file uploaded
    //                        var uploaded_file_name = this.original;
    //                        var saved_file_name = this.target;
    //                        var file_name_input = '<input type="hidden" class="image_name" name="image_names[]" value="' +saved_file_name+ '" />';
    //                        file_info_container.append(file_name_input);
    //
    //                        imageCount--;
    //                    })*/
    //                    //Decrement count of inputs to find all images selected by all multi select are uploaded
    //                    //number_of_inputs--;
    //                    //if(number_of_inputs == 0) {
    //                        //All images selected by each file selector is uploaded
    //                        //Do necessary action post upload
    //                        $('.overlay').hide();
    //                        $('.imagePreviewTable').hide();
    //                        closePostWindow()
    //
    //                   // }
    //                } else {
    //                    /*if (typeof jsonResponse.error_field_name != 'undefined') {
    //                        //Do appropriate error action
    //                    } else {
    //                        alert(jsonResponse.message);
    //                    }*/
    //                    $('.overlay').hide();
    //                    event.preventDefault();
    //                    return false;
    //                }
    //
    //
    //
    //
    //        } else {
    //            /*alert('Something went wrong!');*/
    //            $('.overlay').hide();
    //            event.preventDefault();
    //        }
    //    };
    //    xhr.send(formData);
    //
    //    return false;
    //}