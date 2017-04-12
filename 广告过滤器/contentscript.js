var removeAD = function() {
    if ($) {
        var isRemoveAD = false;
        $("div").each(function() {
            var ele = $(this);
            var cls = ele.context.classList;
            if (cls.length > 0) {
                cls.forEach(function(c) {
                    // 广告的class一般用的uuid字符串.
                    if (c.length == 41) {
                        ele.remove();
                        window.IsHaveAD = true;
                        window.ADLog.push(c);
                        isRemoveAD = true;
                    }
                })
            }
        });
        if (isRemoveAD) {
            clearInterval(removeADSetInter);
            var infoHtml = '<div id="chrome_ex_ad_show" style="padding:10px;display:none;position:fixed;z-index:999999;top:10px;right:10px;border-radius:10px;border:1px solid green;background-color:white;color:gray;text-align:left">#info#</div>';
            var lines = "<p style='text-align:center;margin-bottom:10px;'>>拦截了" + window.ADLog.length + "个广告<</p>";
            window.ADLog.forEach(function(item) {
                lines += "<p>" + item + "</p>";
            });
            $(document.body).append(infoHtml.replace("#info#", lines));
            console.log("拦截了" + window.ADLog.length + "个广告");
            console.log(window.ADLog);
            $("#chrome_ex_ad_show").fadeIn();
            setTimeout(function() {
                $("#chrome_ex_ad_show").fadeOut("slow");
            }, 5000);
        }
    }
}

window.ADLog = [];
window.IsHaveAD = false;
var removeADSetInter = setInterval(removeAD, 50);
setTimeout(function() {
    clearInterval(removeADSetInter);
}, 10000);