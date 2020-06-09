function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

    ScriptLoader.getScripts('ocr.jsdbx', function() {
        Tesseract.recognize('https://dev103823.service-now.com/' + g_form.getValue('name'), newValue, {
            logger: function logger(m) {
                return g_form.setValue('u_ocr_text', 'Progress: ' +  ((parseFloat(m['progress']) * 100).toFixed(2)) + '%');
            }
        }).then(function(_ref) {
            var text = _ref.data.text;
            g_form.setValue('u_ocr_text', text);
        });
    });

}
