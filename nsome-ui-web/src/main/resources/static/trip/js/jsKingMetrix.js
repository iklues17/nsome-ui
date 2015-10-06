/**
 * {
		jskMetrix : [{
			memberId:"",
			memberName:"",
			payment: 0,
			totalAmount: 0,
			itemMapping: [{
				item: {
					itemId:"",
					itemName:"",
					cost: 0
				},
				isPay: boolean,
				isUserInput: boolean,
				amount: 0
			}]
			
		}]
	}
	{
		metrix: [
		{
				item: {
					id:"",
					name:"",
					cost: 0,
					tripId: ""
				},
				mappingMembers: [{
					member: {
						id: "",
						name:"",
						payment: 0,
						tripId: ""
					}
					isPay: boolean,
					isUserInput: boolean,
					amount: 0
				}]
			}
		],
		totalAmounts: [
			{
				memberId: "",
				totalAmout: 0
			}
		]
	}
 */
var JsKingMetrix = (function(){
	
	var ENV = {
		METRIX_ID: "#divMemberItemMap",
		CNT_MEMBER: 0,
		DATA_JSK_METRIX: {}
	};
	//{members:[
	//	{memberId:"", memberName:"", payment:""}...
	//]}
	var gridMemberToThead = function(member){
		var members = member.jskMetrix;
		ENV.CNT_MEMBER = members.length;
		var htmlStr = '<thead>';
		htmlStr += '<tr><th rowspan=2 style="width:10%">Item</th>';
		htmlStr += '<td rowspan=2 style="width:10%">Cost</td>';
		$.each(members, function(idx){
			htmlStr += '<td id="'+this.memberId+'" data-obj="memberName" colspan=3 style="width:'+80/(ENV.CNT_MEMBER)+'%;">'+this.memberName+'</td>';
			htmlStr += '<td data-obj="payment" style="display:none;">'+this.payment+'</td>';
		});
		htmlStr += '</tr>';
		htmlStr += '<tr>';
		$.each(members, function(idx){
			htmlStr += '<td>여부</td><td colspan=2>직접입력</td>';
		});
		htmlStr += '</tr></thead>';
		return htmlStr;
	};

	var gridExpItemToTbody = function(jskMetrix){
		var itemMapping = jskMetrix[0].itemMapping;
		var memberCnt = jskMetrix.length;
		ENV.CNT_MEMBER = memberCnt;
		var htmlStr = "";
		$.each(itemMapping, function(idx){
			htmlStr += '<tr data-obj="itemId" id="'+this.itemId+'" data-rowid="'+this.itemId+'">';
			htmlStr += ' <th data-obj="itemName">'+this.itemName+'</th>';
			htmlStr += ' <td data-obj="itemCost" style="text-align:right;">'+this.cost+'</td>';
			for(var i = 0 ; i < jskMetrix.length ; i++){
				var colid = jskMetrix[i].memberId;
				htmlStr += '<td data-colid="'+colid+'">';
				htmlStr += ' <input type="checkbox" name="isPay" style="width:16px;"/>';
				htmlStr += '</td>';
				htmlStr += '<td data-colid="'+colid+'">';
				htmlStr += ' <input type="checkbox" name="isUserInput" style="width:16px;"/>';
				htmlStr += '</td>';
				htmlStr += '<td data-colid="'+colid+'">';
				htmlStr += ' <input type="text" name="amount" data-role="cash" style="font-size: 0.5rem;text-align:right;" '
				htmlStr +=    'data-is-pay="false" ';
				htmlStr +=    'data-is-user-input="false" readonly ';
				htmlStr +=    'value="0"/>';
				htmlStr += '</td>';
			}
			htmlStr +='</tr>';
		});
		// 마지막 줄은 summary
		htmlStr += '<tr><th>Total</th><td data-obj="totalCost" style="text-align:right;"></td>';
		for(var i = 0 ; i < jskMetrix.length ; i++){
			var colid = jskMetrix[i].memberId;
			htmlStr += '<td colspan=3 data-colid="'+colid+'"><input readonly data-role="cash" type="text" name="totalAmountPerMan" style="text-align:right;" value="0"/></td>';
		}
		htmlStr += "</tr>";
		return htmlStr;
	};
	
	//{items:[
	//	{itemId:"", itemName:"", itemType:"", cost:""}...
	//]}
	var gridExpItemToTbody2 = function(jskMetrix){
		var itemMapping = jskMetrix.itemMapping;
		var memberCnt = ENV.CNT_MEMBER;
		var htmlStr = "";
		$.each(itemMapping, function(idx){
			htmlStr += '<tr data-obj="itemId" id="'+this.itemId+'" data-rowid="'+this.itemId+'">';
			htmlStr += ' <th data-obj="itemName">'+this.itemName+'</th>';
			htmlStr += ' <td data-obj="itemCost" style="text-align:right;">'+this.cost+'</td>';
			for(var i = 0 ; i < memberCnt ; i++){
				htmlStr += '<td>';
				htmlStr += ' <input type="checkbox" name="isPay" style="width:16px;" '+(this.isPay?'checked':'')+'/>';
				htmlStr += '</td>';
				htmlStr += '<td>';
				htmlStr += ' <input type="checkbox" name="isUserInput" style="width:16px;" '+(this.isUserInput?'checked':'')+'/>';
				htmlStr += '</td>';
				htmlStr += '<td>';
				htmlStr += ' <input type="text" name="amount" data-role="cash" style="font-size: 0.5rem;text-align:right;" '
				htmlStr +=    'data-is-pay='+(this.isPay?true:false)+' ';
				htmlStr +=    'data-is-user-input='+(this.isUserInput?'true':'false readonly ')+' ';
				htmlStr +=    'value="'+(this.amount?this.amount:'0')+'"/>';
				htmlStr += '</td>';
			}
			htmlStr +='</tr>';
		});
		// 마지막 줄은 summary
		htmlStr += '<tr><th>Total</th><td data-obj="totalCost" style="text-align:right;"></td>';
		for(var i = 0 ; i < memberCnt ; i++){
			htmlStr += '<td colspan=3><input readonly data-role="cash" type="text" name="totalAmountPerMan" style="text-align:right;" value="'+(jskMetrix[i]?jskMetrix[i].totalAmount:'0')+'"/></td>';
		}
		htmlStr += "</tr>";
		return htmlStr;
	};
	
	var getMetrix = function(tripId){
		var jskMetrix = JSON.parse('[{"memberId":"1","memberName":"슬기","payment":"846,900","totalAmount":"-705,089","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":true,"isUserInput":true,"amount":"5,000"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":true,"isUserInput":false,"amount":"5,000"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"2","memberName":"원기","payment":"0","totalAmount":"84,174","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":true,"isUserInput":true,"amount":"5,000"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":true,"amount":"15,000"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"}]},{"memberId":"3","memberName":"광록","payment":"0","totalAmount":"194,311","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":true,"isUserInput":false,"amount":"5,000"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":true,"amount":"35,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"4","memberName":"정섭","payment":"53,000","totalAmount":"150,311","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":true,"isUserInput":false,"amount":"4,000"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":true,"isUserInput":false,"amount":"5,000"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":false,"amount":"40,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"5","memberName":"은경","payment":"0","totalAmount":"137,011","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"6","memberName":"재관","payment":"50,000","totalAmount":"27,171","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":true,"amount":"25,000"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"7","memberName":"현수","payment":"0","totalAmount":"56,057","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":true,"amount":"35,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"}]},{"memberId":"8","memberName":"경주","payment":"0","totalAmount":"56,057","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":true,"amount":"35,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"}]}]');
		ENV.DATA_JSK_METRIX = jskMetrix;
		return jskMetrix;
	};
	
	var setDatas = function(jskMetrix){

		var metrixRowList = jskMetrix;
		var memberList = $(ENV.METRIX_ID).find('[data-obj="memberName"]');
		var itemList = $(ENV.METRIX_ID).find('[data-obj="itemId"]');
		var isPayList = $(ENV.METRIX_ID).find('input[name="isPay"]');
		var isUserInputList = $(ENV.METRIX_ID).find('input[name="isUserInput"]');
		var amountList = $(ENV.METRIX_ID).find('input[name="amount"]');
		var totalAmountList = $(ENV.METRIX_ID).find('[name="totalAmountPerMan"]');
		var itemCnt = metrixRowList[0].itemMapping.length;
		var memberCnt = metrixRowList.length;
		$.each(metrixRowList, function(n){
			$(totalAmountList[n]).val(this.totalAmount);
			$.each(this.itemMapping, function(m){
				$(isPayList[n+m*memberCnt]).prop('checked', this.isPay);
				$(isUserInputList[n+m*memberCnt]).prop('checked', this.isUserInput);
				$(amountList[n+m*memberCnt]).val(this.amount);
				$(amountList[n+m*memberCnt]).prop('readonly', !this.isUserInput);
				$(amountList[n+m*memberCnt]).attr('data-is-pay', this.isPay);
			});
		})
		
	};
	
	var clearMetrix = function(){
		$(ENV.METRIX_ID).find('input[name="isPay"]').prop('checked', false);
		$(ENV.METRIX_ID).find('input[name="isUserInput"]').prop('checked', false);
		$(ENV.METRIX_ID).find('input[name="amount"]').val(0);
		$(ENV.METRIX_ID).find('input[name="amount"]').prop('readonly', true);
		$(ENV.METRIX_ID).find('input[name="amount"]').attr('data-is-pay', false);
		$(ENV.METRIX_ID).find('[name="totalAmountPerMan"]').val(0);
	};
	
	var resetMetrix = function(){
		setDatas(ENV.DATA_JSK_METRIX);
	};
//	{
//		metrix: [
//		{
//				item: {
//					id:"",
//					name:"",
//					cost: 0,
//					tripId: ""
//				},
//				mappingMembers: [
//					{
//						member: {
//							id: "",
//							name:"",
//							payment: 0,
//							tripId: ""
//						}
//						isPay: boolean,
//						isUserInput: boolean,
//						amount: 0
//					}
//				]
//			}
//		],
//		totalAmounts: [
//			{
//				memberId: "",
//				totalAmout: 0
//			}
//		]
//	}
	var getDatas = function(){
		
		var metrix = [];
		var totalAmouts = [];

		var cols = $(ENV.METRIX_ID).find('[data-obj="memberName"]');
		var rows = $(ENV.METRIX_ID).find('[data-obj="itemId"]');
		
		
		$.each(rows, function(n){
			var _row = this;
			var metrix = {
				item: {
					id: $(this).attr('id'),
					name: $(this).find('[data-obj="itemName"]').text(),
					cost: comm.removeComma($(this).find('[data-obj="itemCost"]').text())*1
				},
				mappingMembers: []
			};
			
			$.each(cols, function(m){
				var colid = $(this).attr('id');
				var col = $(_row).find('td[data-colid="'+colid+'"]');
				var isPayInput = $(col).find('input[name="isPay"]');
				var isUserInputInput = $(col).find('input[name="isUserInput"]');
				var amountInput = $(col).find('input[name="amount"]');
				
				var cols = {
					member: {
						id: $(this).attr('id'),
						name: $(this).text(),
						payment: comm.removeComma($(this).next().text())*1
					},
					isPay: $(isPayInput).prop('checked'),
					isUserInput: $(isUserInputInput).prop('checked'),
					amount: comm.removeComma($(amountInput).val())*1
				};
				metrix.mappingMembers.push(cols);
			});
		});

		var totalAmountList = $(ENV.METRIX_ID).find('input[name="totalAmountPerMan"]');
		$.each(totalAmountList, function(i){
			var totalAmount = {
				memberId: $(this).parents('td').attr('[data-colid]'),
				totalAmout: comm.removeComma($(this).val())*1
			};
			totalAmouts.push(totalAmount);
		});
		
		console.log({
			metrix: metrix,
			totalAmounts: totalAmouts
		});
		

		var jskMetrix = [];

		var memberList = $(ENV.METRIX_ID).find('[data-obj="memberName"]');
		var itemList = $(ENV.METRIX_ID).find('[data-obj="itemId"]');
		var isPayList = $(ENV.METRIX_ID).find('input[name="isPay"]');
		var isUserInputList = $(ENV.METRIX_ID).find('input[name="isUserInput"]');
		var amountList = $(ENV.METRIX_ID).find('input[name="amount"]');
		var totalAmountList = $(ENV.METRIX_ID).find('[name="totalAmountPerMan"]');
		
		// 멤버정보 생성
		$.each(memberList, function(n){
			var memberItemPayment = {
				tripMember: {
					id: $(this).attr('id'),
					name: $(this).text(),
					payment: comm.removeComma($(this).next().text())*1
				},
				totalAmount: comm.removeComma($(totalAmountList[n]).val())*1,
				memberExpenses: []
			};
			$.each(itemList, function(m){
				var itemMap = {
					expenseItem: {
						id: $(this).attr('id'),
						name: $(this).find('[data-obj="itemName"]').text(),
						cost: comm.removeComma($(this).find('[data-obj="itemCost"]').text())*1
					},
					isPay: $(isPayList[n + m*ENV.CNT_MEMBER]).prop('checked'),
					isUserInput: $(isUserInputList[n + m*ENV.CNT_MEMBER]).prop('checked'),
					amount: comm.removeComma($(amountList[n + m*ENV.CNT_MEMBER]).val())*1
				};
				memberItemPayment.memberExpenses.push(itemMap);
			})
			
			
			jskMetrix.push(memberItemPayment);
		});
		
		return jskMetrix;
	};
	
	var calculateIndivisualAmount = function(itemId){
		var $tr = $(ENV.METRIX_ID).find("tr#"+itemId);
		// 해당 항목의 지출액
		var cost = comm.removeComma($tr.find('td:first()').text());
		// 엔빵대상자 : 사용자 입력항목이 아니면서 몫이 체크된 사람
		var n0Members = $tr.find('input[name="amount"][data-is-pay=true][data-is-user-input=false]');
		var nonN0Members = $tr.find('input[name="amount"][data-is-pay=true][data-is-user-input=true]');
		$.each(nonN0Members, function(idx){
			cost -= comm.removeComma($(this).val());
		});
		var n0Cost = Math.round(cost/n0Members.length);
		$.each(n0Members, function(idx){
			$(this).val(comm.addComma(n0Cost));
		});
		
		//인별 Total 계산
		var totalAmountPerMan = [];
		for(var i = 0 ; i < ENV.CNT_MEMBER ; i++){
			totalAmountPerMan.push(0);
		}
		var iptAmountList = $(ENV.METRIX_ID).find('input[name="amount"]');
		if(iptAmountList.length % ENV.CNT_MEMBER !== 0){
			console.log("error");
			debugger;
		}
		$.each(iptAmountList, function(idx){
			totalAmountPerMan[idx%ENV.CNT_MEMBER] += comm.removeComma($(this).val())*1;
		});
		
		var iptTotalAmountPerMan = $(ENV.METRIX_ID).find('input[name="totalAmountPerMan"]');
		// 이미 지불한돈
		var alreadyPaiedList = $(ENV.METRIX_ID).find('[data-obj="payment"]');
		$.each(iptTotalAmountPerMan, function(idx){
			var finalTotalAmount = totalAmountPerMan[idx] - comm.removeComma($(alreadyPaiedList[idx]).text())*1;
			$(this).val(comm.addComma(finalTotalAmount));
		});
	};
	
	var convertForMapping = function(item, member){
		var jskMetrix = [];
		$.each(member.tripMembers, function(n){
			var member = {
				memberId: this.id,
				memberName: this.name,
				payment: this.payment,
				totalAmount: 0,
				itemMapping: []
			};
			$.each(item.expenseItems, function(m){
				var itemMap = {
					itemId: this.id,
					itemName: this.name,
					cost: this.cost,
					isPay: false,
					isUserInput: false,
					amount: 0
				};
				member.itemMapping.push(itemMap);
			})
			
			jskMetrix.push(member);
		});
		ENV.DATA_JSK_METRIX = jskMetrix;
		return ENV.DATA_JSK_METRIX;
	};
	
	var makeMetrix = function(jskMetrix){

//		template.RenderOne({
//	        target: "#divMemberItemMap",
//	        tagName: "table",
//	        className: "",
//	        id: "gridJskMetrix",
//	        position: "new",
//	        template: comm.getHtml("contents/metrix-grid.html"),
//	        data: jskMetrix,
//	        events: {
//	        },
//
//	        afterRender: function() {
//				$("#isExistedMetrix").hide();
//	        }
//	    });
	    
	    var htmlStr = gridExpItemToTbody(jskMetrix);
	    $(ENV.METRIX_ID).find('tbody').append(htmlStr);
		
		// 지출총액 계산
		var totalCost = 0;
		$.each($(ENV.METRIX_ID).find('[data-obj="itemCost"]'), function(idx){
			totalCost += comm.removeComma($(this).text())*1;
		});
		$(ENV.METRIX_ID).find('[data-obj="totalCost"]').text(comm.addComma(totalCost));
		
		//이벤트 매핑 - 체크하면엔빵 처리
		$('input[name="isPay"]').on('change', function(e){
			var tr = $(this).parent().parent();
			// 특정 멤버의 몫
			var $isUserInput = $(this).parent().next().find('[name="isUserInput"]');
			var $amount = $(this).parent().next().next().find('[name="amount"]');
			
			if($(this).prop('checked')){
				$amount.attr('data-is-pay', true);
			}else{
				$amount.val(0);
				$amount.attr('data-is-pay', false);
				$isUserInput.prop('checked', false);
			}
			
			calculateIndivisualAmount($(tr).attr('id'));
			
		});
		
		$('input[name="isUserInput"]').on('change', function(e){
			var $yn = $(this).parent().prev().find('[name="isPay"]');
			var $amount = $(this).parent().next().find('[name="amount"]');
			if($(this).prop('checked')){
				$amount.attr('data-is-user-input', true);
				$amount.attr('data-is-pay', true);
				$amount.attr('readonly', false);
				$amount.val(0);
				$yn.prop('checked', true);
			}else{
				$amount.attr('data-is-user-input', false);
				$amount.attr('data-is-pay', false);
				$amount.attr('readonly', true);
				$amount.val(0);
				$yn.prop('checked', false);
			}
			
			calculateIndivisualAmount($(this).parents('tr').attr('id'));
		});
		
		$('input[name="amount"]').on('input', function(e){
			calculateIndivisualAmount($(this).parents('tr').attr('id'));

			var value = $(this).val();
			value = comm.removeComma(value);
			if (isNaN(value) || value == "") {    // 숫자 형태의 값이 정상적으로 입력되었는지 확인합니다.
				value = value.substring(0,value.length-1);
			}
			$(this).val(comm.addComma(value));
		});
	};
	
	return {
		init: function(){
			var _that = this;
			$("#btnSave").on('click', function(e){
				console.log(_that.getDatas());
			});
			$("#btnClear").on('click',function(e){
				clearMetrix();
			});
			$("#btnReset").on('click',function(e){
				resetMetrix();
			});
		},
		getMetrix: getMetrix,
		getDatas: getDatas,
		setDatas: setDatas,
		
		viewMetrix: function(tripId){
			var jskMetrix = getMetrix(tripId);
			if(comm.isEmptyObj(jskMetrix)){
				$("#isExistedMetrix").show();
				makeMetrix(jskMetrix);
			}else{
				makeMetrix(jskMetrix);
				setDatas(jskMetrix);
			}
		},
		makeMetrix: makeMetrix,
		
		makeNewMetrix: function(item, member){
			
			var _that = this;
			$(ENV.METRIX_ID).find('table').remove();
			
			var jskMetrix = convertForMapping(item, member);
			makeMetrix(jskMetrix);
		}
	};
})();