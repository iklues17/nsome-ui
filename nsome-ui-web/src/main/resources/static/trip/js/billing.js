		
page.Billing = (function(){
	
	var ENV = {
		SUMMARY_GRID_ID: "#gridSummary",
		BILLING_SECT_ID: "#divBills",
		BILLING_GRID_ID: "#gridBills",
		TRIP_ID: "20150927",
		
		CALCULATE: {}
	};
	
	var summaryView = {
		init: function(tripId, memberId){
			this.getCalculate(tripId);
			if(memberId !== undefined && memberId !== null){
				$(ENV.SUMMARY_GRID_ID+' tbody>tr[id="'+memberId+'"]').trigger('click');
			}
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
				    
				    billsView.init();

		        	$("#bodyTripDetailBilling tbody>tr").on('mouseover', function(e){
		            	$(e.currentTarget).addClass('recode-active');
		            });
				    $("#bodyTripDetailBilling  tbody>tr").on('mouseout', function(e){
				    	$(e.currentTarget).removeClass('recode-active');
				    });
				    $(ENV.SUMMARY_GRID_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.SUMMARY_GRID_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
		            	billsView.displayView($(this).attr('id'));
				    });
				    $(ENV.BILLING_GRID_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.BILLING_GRID_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
				    });
				    
				    comm.installGrid($(ENV.SUMMARY_GRID_ID));
				    comm.installGrid($(ENV.BILLING_GRID_ID));
				    
		        }
		    });
		}
	};
	
	var billsView = {
		init: function(){
		    $(ENV.BILLING_SECT_ID).hide();
		    $(ENV.BILLING_GRID_ID+' tbody>tr').hide();
		    $(ENV.BILLING_GRID_ID+' tfoot>tr').hide();
		},
		
		displayView: function(memberId){
		    $(ENV.BILLING_GRID_ID+' tbody>tr').hide();
		    $(ENV.BILLING_GRID_ID+' tfoot>tr').hide();

		    $(ENV.BILLING_GRID_ID+' [data-obj-member="'+memberId+'"]').show();
		    var memberName = $(ENV.SUMMARY_GRID_ID+' tbody>tr[id="'+memberId+'"]').attr('data-obj-name');
		    var memberPayment = $(ENV.SUMMARY_GRID_ID+' tbody>tr[id="'+memberId+'"]').attr('data-obj-payment');
		    var totalPayment = $(ENV.SUMMARY_GRID_ID+' tbody>tr[id="'+memberId+'"]').attr('data-obj-totalAmount');
		    $(ENV.BILLING_GRID_ID+' [data-obj="member-name"]').text(memberName);
		    $(ENV.BILLING_GRID_ID+' [data-obj="member-payment"]').text(memberPayment);
		    $(ENV.BILLING_GRID_ID+' [data-obj="member-totalAmount"]').text(totalPayment);

		    $(ENV.BILLING_SECT_ID).show();
		}
	};
	
	return {
		initPage : function(tripId, memberId){
//			if(!comm.initPage()){
//		    	return;
//		    }
			summaryView.init(tripId, memberId);
		   
		}
	};
})();