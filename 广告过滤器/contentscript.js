var removeAD = function() {
    if ($) {
        var isRemoveAD = false;
        $("div").each(function() {
            var ele = $(this);
            var cl = $.trim($(this).attr("class"));
            cl.split(' ').forEach(function(c) {
                // 广告的class一般用的uuid字符串.
                if (c.length >= 36) {
                    ele.remove();
                    window.IsHaveAD = true;
                    window.ADLog.push(c);
                    isRemoveAD = true;
                }
            })
        });
        if (isRemoveAD) {
            clearInterval(removeADSetInter);
            console.log("拦截了" + window.ADLog.length + "个广告");
        }
    }
}

window.ADLog = [];
window.IsHaveAD = false;
var removeADSetInter = setInterval(removeAD, 50);
setTimeout(function() {
    clearInterval(removeADSetInter);

}, 10000);