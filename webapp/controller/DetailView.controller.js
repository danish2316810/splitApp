sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
  ], (BaseController,Fragment) => {
    "use strict";
  
    return BaseController.extend("app.split.controller.DetailView", {
        onInit() {

          var oModel = new sap.ui.model.json.JSONModel();
          oModel.loadData("/model/mockData/supplier.json");
          this.getView().setModel(oModel);

          let oRouter=this.getOwnerComponent().getRouter();
          oRouter.attachRoutePatternMatched(this.onRouteMatched, this)
        },
        onRouteMatched:function(oEvent){
          let sIndex=oEvent.getParameter("arguments").id
          let mainPath="toolModel>/toolsData/" +sIndex;
          let oView=this.getView()
          oView.bindElement(mainPath)
        },
        onConfirm: function(oEvent) {
          var oItem = oEvent.getParameter("selectedItem");
          var sItem = oItem.mProperties.title;
          //var sItem=oItem.getProperty("title")
          var oInpt = sap.ui.getCore().byId(this.sId);
          oInpt.setValue(sItem);
    
        },
        f4Help: function(oEvent) {
          this.sId = oEvent.getSource().getId();
          var oView = this.getView();
    
          var oModel = oView.getModel();
          // Deep copy
          var oData = JSON.parse(JSON.stringify(oModel.getProperty("/supplierTab"))); 
    
          // Create a temporary model for the fragment
          var oTempModel = new sap.ui.model.json.JSONModel({
            supplierTab: oData
          });
    
          if (!this.dialog) {
            this.dialog = Fragment.load({
              name: "app.split.fragments.popUp",
              controller: this
            }).then(function(oDialog) {
              this.dialog = oDialog;
              oView.addDependent(this.dialog);
              this.dialog.setModel(oTempModel, "fragmentModel");
              this.dialog.open();
            }.bind(this));
          } else {
            this.dialog.open();
          }
         
        }
    });
  });