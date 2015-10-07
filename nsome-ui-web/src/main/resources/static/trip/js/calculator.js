		
page.Calculator = (function(){
	
	var ENV = {
		
		METRIX_GIRD_ID: "#gridJskMetrix",
		TRIP_ID: "20150927",
		TRIP_CAL_ID: "1",
		SAVE_METRIX_BTN: "#btnMetrixSave",
		GO_BILLING_BTN: "#btnGoBilling"
	};
	
	var metrixView = {
		init: function(tripId){
			this.getMetrix(tripId);
		},
		
		getMetrix: function(tripId){
			
			var metrix = JsKingMetrix.getMetrix(tripId);

			if(comm.isEmptyObj(metrix)){
				$("#isExistedMetrix").show();
				
			}else{
				this.displayView(metrix);
				JsKingMetrix.setDatas(metrix);
			}

		},
		
		getExpenseItems: function(){
			return page.Trips.getExpenseItems();
		},
		
		getMembers: function(){
			return page.Trips.getMembers();
		},
		
		displayView: function(metrix){
			
			template.RenderOne({
		        target: "#body",
		        tagName: "div",
		        className: "trip-detail-calculator",
		        id: "bodyTripDetailCalculator",
		        position: "new",
		        template: comm.getHtml("trip/view/metrix.html"),
		        data: metrix,
		        events: {
		        },
	
		        afterRender: function() { 

					$("#isExistedMetrix").hide();
		        	JsKingMetrix.init();
		        	JsKingMetrix.makeMetrix(metrix);
//				    JsKingMetrix.viewMetrix(tripId);
//				    
//				    $(ENV.MAKE_METRIX).on('click', function(){
//				    	JsKingMetrix.makeNewMetrix(expenseItemView.getDatas(), memberView.getDatas());
//				    });
		        	
		        	$(ENV.METRIX_GIRD_ID+" tbody>tr").on('mouseover', function(e){
		            	$(e.currentTarget).addClass('recode-active');
		            });
				    $(ENV.METRIX_GIRD_ID+" tbody>tr").on('mouseout', function(e){
				    	$(e.currentTarget).removeClass('recode-active');
				    });
				    $(ENV.METRIX_GIRD_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.METRIX_GIRD_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
				    });
				    
//				    
				    $(ENV.SAVE_METRIX_BTN).on('click', function(){
				    	
				    	var data = JsKingMetrix.getDatas();
//				    	
//				    	$.ajax({
//			    			url: comm.server.url+"/calculate/trip/" + ENV.TRIP_ID,
//			    			method: "POST",
//			    			data: JSON.stringify(data),
//			    			contentType: "application/json",
//					    }).success(function (data, textStatus, jqXHR) {
//					    	comm.openModalForSuccessMsg("Save Trip Members");
//						}).error(function (jqXHR,  textStatus,  errorThrown){
////										comm.openModalForErrorMsg(errorObj.message, "Unauthorized");
//						});
				    });
				    
				    $(ENV.GO_BILLING_BTN).on('click', function(){
				    	window.location.hash = '#trips/'+ENV.TRIP_ID+'/calculate/billing';
				    });
				    
		        }
		    });
		}
	};
	
	return {
		initPage : function(tripId){
			if(!comm.initPage()){
		    	return;
		    }
			metrixView.init(tripId);
//			window.location.hash = "#trips/20150927";
		   
		}
	};
})();