var videoContent = document.getElementById('contentElement');

var adDisplayContainer =
    new google.ima.AdDisplayContainer(
        document.getElementById('adContainer'),
        videoContent);
// Must be done as the result of a user action on mobile
adDisplayContainer.initialize();

// Re-use this AdsLoader instance for the entire lifecycle of your page.
var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

// Add event listeners
adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);

function onAdError(adErrorEvent) {
    console.log("adError");


    document.getElementById("adContainer").style.display = "none";




    var GameConfig = __require("GameConfig");

    if (GameConfig.playNum == 0) {

        adCompleteFlag = true;
        if (adCompleteFlag && resCompleteFlag) {

            adCompleteFlag = false;

            var launchScene = GameConfig.launchScene;
            var Bros = GameConfig.Bros;
            var caS = GameConfig.caS;
            cc.director.loadScene(launchScene, null,
                function() {
                    adCompleteFlag = false;
                    if (Bros) {
                        // show canvas
                        caS = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }
                    cc.loader.onProgress = null;
                    console.log('Success to load scene: ' + launchScene);
                }

            );



        }

    }



    adEndComplete = true;
    if (adEndComplete && resEndComplete) {
        adEndComplete = false;
        console.log("indexOverErr");
        var MainManger = __require("MainManage");
        MainManger.showGameEndLayer();
    }

    // Handle the error logging and destroy the AdsManager
    console.log(adErrorEvent.getError());
    adsManager.destroy();
}

// An event listener to tell the SDK that our content video
// is completed so the SDK can play any post-roll ads.
var contentEndedListener = function() {
    adsLoader.contentComplete();
};
videoContent.onended = contentEndedListener;

// Request video ads.
var preloader = new google.ima.AdsRequest();
preloader.adTagUrl = 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8708616103041212&description_url=http%3A%2F%2Fwww.vsane.com&videoad_start_delay=-1&hl=zh_CN&max_ad_duration=15000';
// Specify the linear and nonlinear slot sizes. This helps the SDK to
// select the correct creative if multiple are returned.
preloader.linearAdSlotWidth = 640;
preloader.linearAdSlotHeight = 400;
preloader.nonLinearAdSlotWidth = 640;
preloader.nonLinearAdSlotHeight = 400;


// showMyAds();

function showMyAds() {

    // alert("showMy");

    if (typeof(killads) == 'undefined') {
        // alert('广告被过滤');
        console.log("AdNo");
        adEndComplete = false;
        var MainManger = __require("MainManage");
        MainManger.showGameEndLayer();
    } else {


        var winHeight = document.documentElement.clientHeight;
        // document.getElementById("adContainer").style.height = winHeight-60+"px";
        if (document.body.clientHeight > 700) {
            document.getElementById("adContainer").style.height = winHeight - 85 + "px";
        } else {
            document.getElementById("adContainer").style.height = winHeight - 65 + "px";
        }

        document.getElementById("adContainer").style.display = "block";
        adsLoader.requestAds(preloader);

    }





}


function onAdsManagerLoaded(adsManagerLoadedEvent) {
    console.log("ADLoad");

    adCompleteFlag = true;

    // document.getElementById("adContainer").style.display = "block";
    // Get the ads manager.
    adsManager = adsManagerLoadedEvent.getAdsManager(
        videoContent); // See API reference for contentPlayback

    // Add listeners to the required events.
    adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested);

    var o = document.getElementById("adContainer");
    var h = o.offsetHeight; //高度
    var w = o.offsetWidth; //宽度
    try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(w, h, google.ima.ViewMode.FULLSCREEN);
        // Call start to show ads. Single video and overlay ads will
        // start at this time; this call will be ignored for ad rules, as ad rules
        // ads start when the adsManager is initialized.
        adsManager.start();
    } catch (adError) {

        // An error may be thrown if there was a problem with the VAST response.
        // Play content here, because we won't be getting an ad.
        // videoContent.play();
    }
}

function onContentPauseRequested() {


    // This function is where you should setup UI for showing ads (e.g.
    // display ad timer countdown, disable seeking, etc.)
    videoContent.removeEventListener('ended', contentEndedListener);
    videoContent.pause();

}

//广告结束的时候调用的函数
function onContentResumeRequested() {
    console.log("ADLoadComplete", resEndComplete);



    var GameConfig = __require("GameConfig");
    console.log("IndexMainManger", GameConfig.launchScene, GameConfig.Bros, GameConfig.caS);

    if (GameConfig.playNum == 1) {
        adCompleteFlag = true;
        if (adCompleteFlag && resCompleteFlag) {

            var launchScene = GameConfig.launchScene;
            var Bros = GameConfig.Bros;
            var caS = GameConfig.caS;
            cc.director.loadScene(launchScene, null,
                function() {


                    adCompleteFlag = false;



                    if (Bros) {
                        // show canvas
                        var canvas = document.getElementById('GameCanvas');
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }
                    cc.loader.onProgress = null;
                    console.log('Success to load scene1: ' + launchScene);





                }
            );


        }


    }






    adEndComplete = true;
    if (adEndComplete && resEndComplete) {
        adEndComplete = false;
        console.log("indexOverErr");
        var MainManger = __require("MainManage");
        MainManger.showGameEndLayer();
    }

    // This function is where you should ensure that your UI is ready
    // to play content.
    document.getElementById("adContainer").style.display = "none";


    // videoContent.addEventListener('ended', contentEndedListener);
    // videoContent.play();

}

function noAdGoToScene() {


    var GameConfig = __require("GameConfig");
    console.log("IndexMainMangerMaing", GameConfig.launchScene, GameConfig.Bros, GameConfig.caS);

    var launchScene = GameConfig.launchScene;
    var Bros = GameConfig.Bros;
    var caS = GameConfig.caS;
    cc.director.loadScene(launchScene, null,
        function() {

            adCompleteFlag = false;

            if (Bros) {
                // show canvas
                var canvas = document.getElementById('GameCanvas');
                canvas.style.visibility = '';
                var div = document.getElementById('GameDiv');
                if (div) {
                    div.style.backgroundImage = '';
                }
            }
            cc.loader.onProgress = null;
            console.log('Success to load scene1Main: ' + launchScene);





        }
    );


}