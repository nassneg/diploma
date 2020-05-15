var attachRec = new GlideRecord('sys_attachment');
attachRec.addQuery('table_sys_id', poRecord.sys_id.toString()); //poRecord is a GlideRecord that the attachment(s) are associated with
attachRec.addQuery('table_name', poRecord.getTableName());
attachRec.query();


while(attachRec.next()) {

         //Encode attachment data

         var sa = new GlideSysAttachment();

         var binData =   sa.getBytes(attachRec); //this is the encoded attachment. You'll need to add this somehow to your XML

}
var encData =   StringUtil.base64Encode(binData);

var base64string = GlideStringUtil.base64Encode("^.^ JOHN ANDERSEN!");
gs.log(base64string);
//yields: Xi5eIEpPSE4gQU5ERVJTRU4h

orig = GlideStringUtil.base64Decode(base64string);
//yields: ^.^ JOHN ANDERSEN!
gs.log(orig);
