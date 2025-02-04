sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("app.split.controller.App", {
      onInit() {
        var oModle=new sap.ui.model.json.JSONModel();
        oModle.loadData("/model/mockData/toolsData.json");
        // oModle.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
  
          this.getView().setModel(oModle,"toolModel");
      }
  });
});