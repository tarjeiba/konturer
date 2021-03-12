// function runit(e) {
//   // var prog = window.code_editor.getValue(); 
//   let prog = e.getValue();
//   var mypre = document.getElementById("edoutput"); 
//   mypre.innerHTML = ''; 
//   Sk.pre = "edoutput";
//   Sk.configure({output:outf, read:builtinRead}); 
//   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
//   Sk.TurtleGraphics.height = 600; Sk.TurtleGraphics.width = 800;
//   var myPromise = Sk.misceval.asyncToPromise(function() {
//     return Sk.importMainWithBody("<stdin>", false, prog, true);
//   });
//   myPromise.then(function(mod) {
//     console.log('success');
//   },
// 		 function(err) {
// 		   console.log(err.toString());
// 		   $('#edoutput').text(err.toString());
// 		 });
// } 


function saveit(){
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'CanvasAsImage.png');
  let canvas = document.getElementById('mycanvas');
  canvas.toBlob(function(blob) {
    let url = URL.createObjectURL(blob);
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  });
}

$(document).ready(function () { // Dette er en jquery-funksjon -- sjekk den ut
  var output = $('#edoutput');
  var outf = function (text) {
    output.text(output.text() + text);
  };

  var keymap = {
    "Ctrl-Enter" : function (editor) {
      let prog = editor.getValue();
      var mypre = document.getElementById("edoutput"); 
      mypre.innerHTML = ''; 
      Sk.pre = "edoutput";
      Sk.configure({output:outf, read:builtinRead}); 
      (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
      Sk.TurtleGraphics.height = 600; Sk.TurtleGraphics.width = 800;
      var myPromise = Sk.misceval.asyncToPromise(function() {
	return Sk.importMainWithBody("<stdin>", false, prog, true);
      });
      myPromise.then(function(mod) {
	console.log('Success');
      },
		     function(err) {
		       console.log(err.toString());
		       $('#edoutput').text(err.toString());
		     });
    } 

  } 
  
  var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'python',		// 
    matchBrackets: true,
    dragDrop: false,
    styleSelectedText: false,
    showCursorWhenSelecting: true,
    lineWrapping: true,
    extraKeys: keymap,
  });

  window.code_editor = editor;
  window.outf = outf;
  window.builtinRead = builtinRead;

  $("#skulpt_run").click(function () { keymap["Ctrl-Enter"](editor)} );

  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }
  
  editor.focus();
});
