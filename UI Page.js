<div class="form-section">
<label>${gs.getMessage("Text")}</label> <br/>
          <!--text field start-->
            <textarea class="form-control propose-modal-textarea" id="immedCGLiveImp" name="immedCGLiveImp" type="text" mandatory="true" value="" onkeyup="enableSaveButtonCheck()" onchange="checkMandatory()"></textarea>
          <!--text field end-->
</div>

<div class="form-body">
<select id="test_suites" class="form-control" name="test_suites">
  <option value="" selected="selected">-- Choose Test Suite --</option>
  <j:while test="${jvar_gr.next()}">
    <option value="${jvar_gr.getValue('sys_id')}">${jvar_gr.getDisplayValue('u_name')}</option>
  </j:while>
</select>
  </div>
<div align="right"  >
     <button
   style="margin: 10px"
         id="close_button"
         type="button"
         class="btn btn-default"
         onclick="GlideDialogWindow.prototype.locate(this).destroy(); return false">
       ${gs.getMessage('NOOO')}
     </button>
</div>
