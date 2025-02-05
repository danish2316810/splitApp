sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"
], (Controller,FilterOperator,Filter) => {
    "use strict";

    return Controller.extend("app.split.controller.View1", {
        
        onItemPress:function(oControlEvent){
            var item=oControlEvent.getParameter("listItem");
            var sPath=item.oBindingContexts.toolModel.sPath;
            let aIndex=sPath.split("/")
            let sIndex=aIndex[aIndex.length-1]

            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail",{
                id:sIndex
            })

            // var mainPath="toolModel>" +sPath;
            // var oApp=this.getView().getParent().getParent();
            //    var oView2=oApp.getDetailPage("idDetail");
            //    oView2.bindElement(mainPath);
              
            //   this.onPressToView2();
            //        // oApp.to("idDetail");
              
          },
          onSort:function(){
              
              if(this.descending==="undefined"){
                  this.descending=false; 
              }
              
              var sorter=new sap.ui.model.Sorter("name", this.descending);
              var oList=this.getView().byId("idListItem");
              var oBinding=oList.getBinding("items");
              oBinding.sort(sorter);
  
                   this.descending=!this.descending;
          },
          
          onSearch:function(oEvent){
                  // var searchST=this.getView().byId("idSearch").getValue();
              var searchString=oEvent.getParameter("query") || oEvent.getParameter("newValue");
              
              var fitler1=new Filter("name", FilterOperator.Contains, searchString);
               var fitler2=new Filter("id", FilterOperator.Contains, searchString);
           
               var aFilter=[fitler1,fitler2];
               var mainFilter=new Filter({
                   filters:aFilter,
                   and:false
               });
               var oList=this.getView().byId("idListItem");
               var bindingItems=oList.getBinding("items");
               bindingItems.filter(mainFilter);
               
              
              
          },
          
          onPressToView2:function(){
              
              var oRouter=this.getOwnerComponent().getRouter();
              oRouter.navTo("RouteDetail");
          }
      
          
  
    });
});