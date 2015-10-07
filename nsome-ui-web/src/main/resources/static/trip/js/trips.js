		
page.Trips = (function(){
	
	var ENV = {
		EXP_ITEM_DIV_ID: "#divExpItem",
		EXP_ITEM_GRID_ID: "#gridExpItem",
		ADD_EXP_ITEM_BTN: "#btnAddExpItem",
		MOD_EXP_ITEM_BTN: "#btnModExpItem",
		DEL_EXP_ITEM_BTN: "#btnDelExpItem",
		
		MEMBER_DIV_ID: "#divMembers",
		MEMBER_GRID_ID: "#gridMembers",
		ADD_MEMBER_BTN: "#btnAddMember",
		MOD_MEMBER_BTN: "#btnModMember",
		DEL_MEMBER_BTN: "#btnDelMember",
		
		SAVE_MEMBER_BTN: "#btnTripMembersSave",
		SAVE_ITEM_BTN: "#btnExpenseItemsSave",
		MAKE_METRIX: "#btnMakeMatrix",
		
		TRIP_ID: "20150927",
		TRIP_CAL_ID: "1",
	};
	
	var tripsView = {
		init : function(){
			this.displayView();
		},
		
		displayView : function(){
			var _that = this;

			template.RenderOne({
		        target: "#body",
		        tagName: "div",
		        className: "trip-detail",
		        id: "bodyTripDetail",
		        position: "new",
		        template: comm.getHtml("trip/view/trips-template.html"),
		        data: {},
		        events: {
		        },
	
		        afterRender: function() { 
//		        	tripsView.init();
		        }
		    });
			
		},
	};
	
	var tripDetailView = {
		init : function(tripId){
			this.displayView(tripId);
		},
		
		displayView: function(tripId){

		    template.RenderOne({
		        target: "#body",
		        tagName: "div",
		        className: "trip-detail",
		        id: "bodyTripDetail",
		        position: "new",
		        template: comm.getHtml("trip/view/trip-detail-template.html"),
		        data: {},
		        events: {
		        },
	
		        afterRender: function() {
					
					expenseItemView.init(tripId);
					
					memberView.init(tripId);
					
					$(ENV.MAKE_METRIX).on('click', function(){
				    	window.location.hash = '#trips/'+ENV.TRIP_ID+'/calculate';
				    });
		        }
		    });
		}
	};
	
	var memberView = {
		init : function(tripId){
			this.getMembers();
		},
		
		getMembers: function(tripId){
			
			$.ajax({
				asyc: true,
    			url: comm.server.url+"/member/of/trip/" + ENV.TRIP_ID,
    			method: "GET",
    			dataType: 'json',
    			contentType: "application/json",
		    }).success(function (data, textStatus, jqXHR) {
		    	memberView.displayView(data);
			}).error(function (jqXHR,  textStatus,  errorThrown){
				debugger;
//				comm.openModalForErrorMsg(errorObj.message, "");
			});
		},
		
		displayView : function(members){

			var _that = this;
			
			var totalPayment = 0;
			$.each(members, function(idx){
				totalPayment += this.payment;
			});
			
		    var memberGrid = {
				tableheaders : [
	                {display:'Name',		hidden:false, width: '50%'},
	                {display:'Payment',		hidden:false, width: '50%'}
                ],
                tabledatas: members,
                totalPayment: comm.addComma(totalPayment)
    		};
		    
		    template.RenderOne({
		        target: "#divMembers",
		        tagName: "div",
		        className: "trip-detail-members",
		        id: "bodyTripDetailMembers",
		        position: "new",
		        template: comm.getHtml("trip/view/members.html"),
		        data: memberGrid,
		        events: {
		        },
	
		        afterRender: function() {
				    
		            $(ENV.MEMBER_GRID_ID+" tbody>tr").on('mouseover', function(e){
		            	$(e.currentTarget).addClass('recode-active');
		            });
				    $(ENV.MEMBER_GRID_ID+" tbody>tr").on('mouseout', function(e){
				    	$(e.currentTarget).removeClass('recode-active');
				    });
				    $(ENV.MEMBER_GRID_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.MEMBER_GRID_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
				    });
				    
				    $(ENV.MOD_MEMBER_BTN).on('click', function(e){
				    	var datas = [$(ENV.MEMBER_GRID_ID).find('.recode-selected').attr('id')];
				    	var tds = $(ENV.MEMBER_DIV_ID).find('.recode-selected > td');
				    	$.each(tds, function(i){
				    		datas.push($(this).text());
				    	});
				    	comm.openModalForEntry("MOD", comm.getHtml("trip/view/form/member-form.html"), datas, _that.callbackModModal);
				    });
				    $(ENV.ADD_MEMBER_BTN).on('click', function(e){
				    	comm.openModalForEntry("ADD", comm.getHtml("trip/view/form/member-form.html"), null, _that.callbackAddModal);
				    });
				    $(ENV.DEL_MEMBER_BTN).on('click', function(e){
				    	$(ENV.MEMBER_GRID_ID+' tbody>tr.recode-selected').remove();
				    });
				    $(ENV.SAVE_MEMBER_BTN).on('click', function(e){
				    	_that.saveDatas();
				    });
				    
				    comm.installGrid($(ENV.MEMBER_GRID_ID));
		        }
		    });
		},
		
		saveDatas: function(){
			var tripMembers = this.getDatas().tripMembers;
			$.ajax({
    			url: comm.server.url+"/member/of/trip/" + ENV.TRIP_ID,
    			method: "POST",
    			data: JSON.stringify(tripMembers),
    			contentType: "application/json",
		    }).success(function (data, textStatus, jqXHR) {
		    	comm.openModalForSuccessMsg("Save Trip Members");
			}).error(function (jqXHR,  textStatus,  errorThrown){
				debugger;
//				var errorObj = jqXHR.responseJSON;
//				comm.openModalForErrorMsg(errorObj.message, "Unauthorized");
			});
		},
		
		getDatas : function(){
			var members = [];
			var trs = $(ENV.MEMBER_GRID_ID+' [data-obj="member"]');
			$.each(trs, function(idx){
				members.push({
					id:$(this).attr('id'),
					name: $(this).find('[data-obj="memberName"]').text(),
					payment: comm.removeComma($(this).find('[data-obj="payment"]').text())*1,
					tripId: ENV.TRIP_ID
				});
			});
			return {
				tripMembers: members,
				totalPayment: comm.removeComma($('[data-obj="membersTot"]').text())*1
			};
		},
		
		callbackModModal: function(datas){
			var currRow = $(ENV.MEMBER_GRID_ID+' tbody>tr.recode-selected');
			$(currRow).find('td:eq(0)').text(datas.name);
			$(currRow).find('td:eq(1)').text(datas.payment);
			comm.closeModal();
		},
		
		callbackAddModal: function(datas){
			$(ENV.MEMBER_GRID_ID+' tbody').append('<tr><td></td><td></td></tr>');
			var newRow = $(ENV.MEMBER_GRID_ID+' tbody').find('tr:last()');
			$(newRow).find('td:eq(0)').text(datas.name);
			$(newRow).find('td:eq(1)').text(datas.payment);
			comm.closeModal();
		}
	};
	
	var expenseItemView = {
		init : function(tripId){
			this.getItems();
		},
		
		getItems: function(tripId){
			
			$.ajax({
				asyc: true,
    			url: comm.server.url+"/expense-item/of/trip/" + ENV.TRIP_ID,
    			method: "GET",
    			dataType: 'json',
    			contentType: "application/json",
		    }).success(function (data, textStatus, jqXHR) {
		    	expenseItemView.displayView(data);
			}).error(function (jqXHR,  textStatus,  errorThrown){
				debugger;
//				comm.openModalForErrorMsg(errorObj.message, "");
			});
		},
		
		displayView : function(items){

			var _that = this;
			
			var totalCost = 0;
			$.each(items, function(idx){
				totalCost += this.cost;
			});
		    var itemGrid = {
				tableheaders : [
	                {display:'Item Name',	hidden:false, width: '50%'},
	                {display:'Cost',		hidden:false, width: '50%'}
                ],
                tabledatas: items,
                totalCost: comm.addComma(totalCost)
    		};
		    
		    template.RenderOne({
		        target: "#divExpItem",
		        tagName: "div",
		        className: "trip-detail-items",
		        id: "bodyTripDetailItems",
		        position: "new",
		        template: comm.getHtml("trip/view/expenses-items.html"),
		        data: itemGrid,
		        events: {
		        },
	
		        afterRender: function() {
					
		            $(ENV.EXP_ITEM_GRID_ID+" tbody>tr").on('mouseover', function(e){
		            	$(e.currentTarget).addClass('recode-active');
		            });
				    $(ENV.EXP_ITEM_GRID_ID+" tbody>tr").on('mouseout', function(e){
				    	$(e.currentTarget).removeClass('recode-active');
				    });
				    $(ENV.EXP_ITEM_GRID_ID+" tbody>tr").on('click', function(e){
		            	$(ENV.EXP_ITEM_GRID_ID+" tbody>tr").removeClass('recode-selected');
		            	$(e.currentTarget).addClass('recode-selected');
				    });
				    
				    $(ENV.MOD_EXP_ITEM_BTN).on('click', function(e){
				    	var datas = [$(ENV.EXP_ITEM_GRID_ID).find('.recode-selected').attr('id')];
				    	var tds = $(ENV.EXP_ITEM_DIV_ID).find('.recode-selected > td');
				    	$.each(tds, function(i){
				    		datas.push($(this).text());
				    	});
				    	comm.openModalForEntry("MOD", comm.getHtml("trip/view/form/expenses-item-form.html"), datas, _that.callbackModModal);
				    });
				    $(ENV.ADD_EXP_ITEM_BTN).on('click', function(e){
				    	comm.openModalForEntry("ADD", comm.getHtml("trip/view/form/expenses-item-form.html"), null, _that.callbackAddModal);
				    });
				    $(ENV.DEL_EXP_ITEM_BTN).on('click', function(e){
				    	$(ENV.EXP_ITEM_GRID_ID+' tbody>tr.recode-selected').remove();
				    });
				    $(ENV.SAVE_ITEM_BTN).on('click', function(e){
				    	_that.saveDatas();
				    });
				    
				    comm.installGrid($(ENV.EXP_ITEM_GRID_ID));
		        }
		    });
		},
		
		saveDatas: function(){
			var expItems = this.getDatas().expenseItems;
			$.ajax({
    			url: comm.server.url+"/expense-item/of/trip/" + ENV.TRIP_ID,
    			method: "POST",
    			data: JSON.stringify(expItems),
    			contentType: "application/json",
		    }).success(function (data, textStatus, jqXHR) {
		    	comm.openModalForSuccessMsg("Save Expense Items");
			}).error(function (jqXHR,  textStatus,  errorThrown){
				var errorObj = jqXHR.responseJSON;
				comm.openModalForErrorMsg(errorObj.message, "Unauthorized");
			});
		},
		
		getDatas : function(){
			var items = [];
			var trs = $(ENV.EXP_ITEM_GRID_ID+' [data-obj="item"]');
			$.each(trs, function(idx){
				items.push({
					id:$(this).attr('id'),
					name: $(this).find('[data-obj="itemName"]').text(),
					cost: comm.removeComma($(this).find('[data-obj="cost"]').text())*1,
					tripId: ENV.TRIP_ID
				});
			});
			return {
				expenseItems: items,
				totalExpense: comm.removeComma($('[data-obj="expItemsTot"]').text())*1
			};
		},
		
		callbackModModal: function(datas){
			var currRow = $(ENV.MEMBER_GRID_ID+' tbody>tr.recode-selected');
			$(currRow).find('td:eq(0)').text(datas.itemName);
			$(currRow).find('td:eq(1)').text(datas.cost);
			comm.closeModal();
		},
		
		callbackAddModal: function(datas){
			$(ENV.MEMBER_GRID_ID+' tbody').append('<tr><td></td><td></td><td></td></tr>');
			var newRow = $(ENV.EXP_ITEM_GRID_ID+' tbody').find('tr:last()');
			$(newRow).find('td:eq(0)').text(datas.itemName);
			$(newRow).find('td:eq(1)').text(datas.cost);
			comm.closeModal();
		}
	}
	
	return {
		initPage : function(){

			if(!comm.initPage()){
		    	return;
		    }
			tripsView.init();
		   
		},
		
		initDetailPage: function(tripId){

			if(!comm.initPage()){
		    	return;
		    }
		    tripDetailView.init(tripId);
		},
		
		getExpenseItems: expenseItemView.getItems(),
		getMembers: memberView.getMembers()
	};
})();