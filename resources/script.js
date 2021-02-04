var ExcInt=0;
var quizConfig=[];

function executeTest(){
	if(document.getElementById('scorm_object').contentDocument==null){
		console.log("contentDocument is not exists");
		return false;

    }
    else if(document.getElementById('scorm_object').contentDocument.body==null){
			console.log("contentDocument body is not exists");
			return false;
    }

    if (document.getElementById('scorm_object').contentDocument.getElementsByClassName('ui icon button red')[0]!=null){
        //window.location.reload(true);
        clearInterval(ExcInt);
    }

    if (document.getElementById('scorm_object').contentDocument.getElementsByClassName('ui form')[0]!=null){
        var answers=document.getElementById('scorm_object').contentDocument.getElementsByClassName('ui form')[0].children;
        var isCorrect = false;

        for(i=0;i<answers.length;i++){
            for(f=0;f<quizConfig.right.length;f++){
                if(answers[i].innerText==quizConfig.right[f]){
                    realClick(document.getElementById('scorm_object').contentDocument.getElementsByClassName('ui form')[0].children[i])
                    isCorrect = true;
                    break;
                }
            }
            if (isCorrect){
                console.log('+ ' + answers[i].innerText);
            } else { console.log('- ' + answers[i].innerText); }
        }
        console.log(' ');
        realClick(document.getElementById('scorm_object').contentDocument.getElementsByClassName('ui button')[0])
    }
				
	if(document.getElementById('scorm_object').contentDocument.getElementsByClassName('ui green label')[0]!=null){
		clearInterval(ExcInt);
        setTimeout(window.location.reload(true), 1000);
	}
}

function stop(){
	clearInterval(ExcInt);
}

function go(){
    var scripts = document.getElementById('scorm_object').contentDocument.getElementsByTagName('script');
    for (i=0;i<scripts.length;i++){
        if (document.getElementById('scorm_object').contentDocument.getElementsByTagName('script')[i].outerHTML=='<script src="config.js"></script>'){
            if (typeof someObject == 'undefined') $.loadScript(document.getElementById('scorm_object').contentDocument.getElementsByTagName('script')[i].src, function(){
                quizConfig = __quizConfig;
            });
        }
    }
	ExcInt=setInterval(executeTest,300);
}

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: false
    });
}

var dispatchMouseEvent = function(target, var_args) {
    var e = document.createEvent("MouseEvents");
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
};
  
var realClick = function(elem) {
    dispatchMouseEvent(elem, 'mouseover', true, true);
    dispatchMouseEvent(elem, 'mousedown', true, true);
    dispatchMouseEvent(elem, 'click', true, true);
    dispatchMouseEvent(elem, 'mouseup', true, true);
}

console.clear();
go();
