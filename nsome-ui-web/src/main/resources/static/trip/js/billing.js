		
page.Billing = (function(){
	
	var ENV = {
		SUMMARY_GRID_ID: "#gridSummary",
		BILLING_SECT_ID: "#divBills",
		BILLING_GRID_ID: "#gridBills",
		TRIP_ID: "20150927",
		
		CALCULATE: {}
	};
	
	var summaryView = {
		init: function(tripId){
			this.getCalculate(tripId);
		},
		
		getCalculate: function(tripId){
			
			var metrix = JsKingMetrix.getMetrix(tripId);

			if(comm.isEmptyObj(metrix)){
				alert("정산내역이 존재하지 않습니다.");
			}else{
				ENV.CALCULATE = metrix;
				this.displayView(metrix);
				JsKingMetrix.setDatas(metrix);
			}

		},
		
		displayView: function(metrix){

			template.RenderOne({
		        target: "#body",
		        tagName: "div",
		        className: "trip-detail-billing",
		        id: "bodyTripDetailBilling",
		        position: "new",
		        template: comm.getHtml("trip/view/billing.html"),
		        data: metrix,
		        events: {
		        },
	
		        afterRender: function() {

		        	$("#bodyTripDetailBilling tbody>tr").on('mouseover', function(e){
		            	$(e.currentTarget).addClass('recode-active');
		            });
				    $("#bodyTripDetailBilling  tbody>tr").on('mouseout', function(e){
				    	$(e.currentTarget).removeClass('recode-active');
				    });
				    $(ENV.SUMMARY_GRID_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.SUMMARY_GRID_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
				    });
				    $(ENV.BILLING_GRID_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.BILLING_GRID_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
				    });
				    
				    $(ENV.BILLING_SECT_ID).hide();
				    $(ENV.BILLING_GRID_ID+' tr').hide();
				    $(ENV.BILLING_GRID_ID+' [data-obj-member="1"]').show();
				    
				    comm.installGrid($(ENV.SUMMARY_GRID_ID));
				    comm.installGrid($(ENV.BILLING_GRID_ID));
				    
		        }
		    });
		}
	};
	
	return {
		initPage : function(memberId){
//			if(!comm.initPage()){
//		    	return;
//		    }
			summaryView.init(memberId);
//			window.location.hash = "#trips/20150927";
		   
		}
	};
})();