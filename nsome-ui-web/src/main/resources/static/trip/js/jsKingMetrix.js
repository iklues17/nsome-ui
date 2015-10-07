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
//						},
//						isPay: boolean,
//						isUserInput: boolean,
//						amount: 0
//					}
//				]
//			}
//		],
//		totalAmounts: [
//			{
//				member: {
//					id: "",
//					name: "",
//					payment: 0
//				},
//				totalAmount: 0
//			}
//		]
//	}
 */
var JsKingMetrix = (function(){
	
	var ENV = {
		METRIX_ID: "#divMemberItemMap",
		CNT_MEMBER: 0,
		DATA_JSK_METRIX: {}
	};

	var gridExpItemToTbody = function(jskMetrix){
		var metrix = jskMetrix.metrix;
		ENV.CNT_MEMBER = metrix[0].mappingMembers.length;
		var htmlStr = "";
		$.each(metrix, function(idx){
			htmlStr += '<tr data-obj="itemId" id="'+this.item.id+'" data-rowid="'+this.item.id+'">';
			htmlStr += ' <th data-obj="itemName">'+this.item.name+'</th>';
			htmlStr += ' <td data-obj="itemCost" style="text-align:right;">'+comm.addComma(this.item.cost)+'</td>';
			for(var i = 0 ; i < this.mappingMembers.length ; i++){
				var colid = this.mappingMembers[i].member.id;
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
		for(var i = 0 ; i < metrix[0].mappingMembers.length ; i++){
			var colid = metrix[0].mappingMembers[i].member.id;
			htmlStr += '<td colspan=3 data-colid="'+colid+'"><input readonly data-role="cash" type="text" name="totalAmountPerMan" style="text-align:right;" value="0"/></td>';
		}
		htmlStr += "</tr>";
		return htmlStr;
	};
	
	var getMetrix = function(tripId){
//		var jskMetrix = JSON.parse('[{"memberId":"1","memberName":"슬기","payment":"846,900","totalAmount":"-705,089","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":true,"isUserInput":true,"amount":"5,000"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":true,"isUserInput":false,"amount":"5,000"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"2","memberName":"원기","payment":"0","totalAmount":"84,174","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":true,"isUserInput":true,"amount":"5,000"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":true,"amount":"15,000"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"}]},{"memberId":"3","memberName":"광록","payment":"0","totalAmount":"194,311","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":true,"isUserInput":false,"amount":"5,000"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":true,"amount":"35,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"4","memberName":"정섭","payment":"53,000","totalAmount":"150,311","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":true,"isUserInput":false,"amount":"4,000"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":true,"isUserInput":false,"amount":"5,000"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":false,"amount":"40,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"5","memberName":"은경","payment":"0","totalAmount":"137,011","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":true,"isUserInput":false,"amount":"22,500"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":true,"isUserInput":false,"amount":"14,200"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":true,"isUserInput":false,"amount":"3,600"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":true,"isUserInput":false,"amount":"5,040"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":false,"amount":"27,500"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"6","memberName":"재관","payment":"50,000","totalAmount":"27,171","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":true,"isUserInput":false,"amount":"667"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":true,"isUserInput":false,"amount":"500"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":true,"isUserInput":false,"amount":"5,667"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":true,"isUserInput":false,"amount":"19,200"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":true,"isUserInput":false,"amount":"6,140"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":true,"isUserInput":false,"amount":"1,960"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":true,"isUserInput":false,"amount":"780"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,500"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":true,"isUserInput":true,"amount":"25,000"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":true,"isUserInput":false,"amount":"12,000"}]},{"memberId":"7","memberName":"현수","payment":"0","totalAmount":"56,057","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":true,"amount":"35,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"}]},{"memberId":"8","memberName":"경주","payment":"0","totalAmount":"56,057","itemMapping":[{"itemId":"1","itemName":"일)대여","cost":"90,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"2","itemName":"일)저녁","cost":"71,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"3","itemName":"일)닭강정","cost":"18,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"4","itemName":"일)술","cost":"25,200","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"5","itemName":"월)아침","cost":"4,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"6","itemName":"월)슈퍼","cost":"3,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"7","itemName":"월)커피","cost":"14,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"8","itemName":"월)점심","cost":"34,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"9","itemName":"월)저녁","cost":"96,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"10","itemName":"월)술1","cost":"30,700","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"11","itemName":"월)술2","cost":"9,800","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"12","itemName":"월)술3","cost":"3,900","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"13","itemName":"월)술4","cost":"18,800","isPay":true,"isUserInput":false,"amount":"2,686"},{"itemId":"14","itemName":"월)술5","cost":"7,500","isPay":true,"isUserInput":false,"amount":"1,071"},{"itemId":"15","itemName":"화)아침","cost":"7,500","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"16","itemName":"화)커피","cost":"15,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"17","itemName":"화)대여","cost":"145,000","isPay":true,"isUserInput":true,"amount":"35,000"},{"itemId":"18","itemName":"화)점심","cost":"30,000","isPay":true,"isUserInput":false,"amount":"6,000"},{"itemId":"19","itemName":"화)아스크림","cost":"3,500","isPay":true,"isUserInput":false,"amount":"700"},{"itemId":"20","itemName":"화)저녁","cost":"53,000","isPay":true,"isUserInput":false,"amount":"10,600"},{"itemId":"21","itemName":"유류비","cost":"150,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"22","itemName":"일)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"},{"itemId":"23","itemName":"월)숙박","cost":"60,000","isPay":false,"isUserInput":false,"amount":"0"}]}]');
		var jskMetrix = JSON.parse('{"metrix":[{"item":{"id":"1","name":"일)대여","cost":90000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":22500},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":22500},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":22500},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":22500},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"2","name":"일)저녁","cost":71000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":14200},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":14200},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":14200},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":14200},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":14200},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"3","name":"일)닭강정","cost":18000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":3600},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":3600},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":3600},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":3600},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":3600},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"4","name":"일)술","cost":25200},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":5040},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":5040},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":5040},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":5040},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":5040},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"5","name":"월)아침","cost":4000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":667},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":667},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":667},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":667},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":667},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":667},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"6","name":"월)슈퍼","cost":3000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":500},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":500},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":500},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":500},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":500},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":500},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"7","name":"월)커피","cost":14000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":true,"amount":5000},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":true,"amount":5000},{"member":{"id":"3","name":"광록","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":4000},{"member":{"id":"5","name":"은경","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"8","name":"월)점심","cost":34000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":5667},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":5667},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":5667},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":5667},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":5667},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":5667},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"9","name":"월)저녁","cost":96000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":19200},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":19200},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":19200},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":19200},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":19200},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"10","name":"월)술1","cost":30700},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":6140},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":6140},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":6140},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":6140},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":6140},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"11","name":"월)술2","cost":9800},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":1960},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":1960},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":1960},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":1960},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":1960},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"12","name":"월)술3","cost":3900},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":780},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":780},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":780},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":780},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":780},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"13","name":"월)술4","cost":18800},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":2686},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":2686},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":2686},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":2686},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":2686},{"member":{"id":"7","name":"현수","payment":0},"isPay":true,"isUserInput":false,"amount":2686},{"member":{"id":"8","name":"경주","payment":0},"isPay":true,"isUserInput":false,"amount":2686}]},{"item":{"id":"14","name":"월)술5","cost":7500},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":1071},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":1071},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":1071},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":1071},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":1071},{"member":{"id":"7","name":"현수","payment":0},"isPay":true,"isUserInput":false,"amount":1071},{"member":{"id":"8","name":"경주","payment":0},"isPay":true,"isUserInput":false,"amount":1071}]},{"item":{"id":"15","name":"화)아침","cost":7500},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":1500},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":1500},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":1500},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":1500},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":1500},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"16","name":"화)커피","cost":15000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":5000},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":5000},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":5000},{"member":{"id":"5","name":"은경","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"17","name":"화)대여","cost":145000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":true,"amount":35000},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":40000},{"member":{"id":"5","name":"은경","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":true,"isUserInput":true,"amount":35000},{"member":{"id":"8","name":"경주","payment":0},"isPay":true,"isUserInput":true,"amount":35000}]},{"item":{"id":"18","name":"화)점심","cost":30000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":6000},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":6000},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":6000},{"member":{"id":"5","name":"은경","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":true,"isUserInput":false,"amount":6000},{"member":{"id":"8","name":"경주","payment":0},"isPay":true,"isUserInput":false,"amount":6000}]},{"item":{"id":"19","name":"화)아스크림","cost":3500},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":700},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":700},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":700},{"member":{"id":"5","name":"은경","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":true,"isUserInput":false,"amount":700},{"member":{"id":"8","name":"경주","payment":0},"isPay":true,"isUserInput":false,"amount":700}]},{"item":{"id":"20","name":"화)저녁","cost":53000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":10600},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":10600},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":10600},{"member":{"id":"5","name":"은경","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":true,"isUserInput":false,"amount":10600},{"member":{"id":"8","name":"경주","payment":0},"isPay":true,"isUserInput":false,"amount":10600}]},{"item":{"id":"21","name":"유류비","cost":150000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":27500},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":true,"amount":15000},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":27500},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":27500},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":27500},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":true,"amount":25000},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"22","name":"일)숙박","cost":60000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"2","name":"원기","payment":0},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"6","name":"재관","payment":50000},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]},{"item":{"id":"23","name":"월)숙박","cost":60000},"mappingMembers":[{"member":{"id":"1","name":"슬기","payment":846900},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"2","name":"원기","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"3","name":"광록","payment":0},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"4","name":"정섭","payment":53000},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"5","name":"은경","payment":0},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"6","name":"재관","payment":50000},"isPay":true,"isUserInput":false,"amount":12000},{"member":{"id":"7","name":"현수","payment":0},"isPay":false,"isUserInput":false,"amount":0},{"member":{"id":"8","name":"경주","payment":0},"isPay":false,"isUserInput":false,"amount":0}]}],"totalAmounts":[{"member":{"id":"1","name":"슬기","payment":846900},"totalAmount":-705089},{"member":{"id":"2","name":"원기","payment":0},"totalAmount":84174},{"member":{"id":"3","name":"광록","payment":0},"totalAmount":194311},{"member":{"id":"4","name":"정섭","payment":53000},"totalAmount":150311},{"member":{"id":"5","name":"은경","payment":0},"totalAmount":137011},{"member":{"id":"6","name":"재관","payment":50000},"totalAmount":27171},{"member":{"id":"7","name":"현수","payment":0},"totalAmount":56057},{"member":{"id":"8","name":"경주","payment":0},"totalAmount":56057}]}');
		ENV.DATA_JSK_METRIX = jskMetrix;
		return jskMetrix;
	};
	
	var setDatas = function(jskMetrix){
		var metrix = jskMetrix.metrix;
		var cols = $(ENV.METRIX_ID).find('[data-obj="memberName"]');
		var rows = $(ENV.METRIX_ID).find('[data-obj="itemId"]');

		$.each(rows, function(n){
			var _row = this;
			
			$.each(cols, function(m){
				var colid = $(this).attr('id');
				var col = $(_row).find('td[data-colid="'+colid+'"]');
				var isPayInput = $(col).find('input[name="isPay"]');
				var isUserInputInput = $(col).find('input[name="isUserInput"]');
				var amountInput = $(col).find('input[name="amount"]');

				var mapping = metrix[n].mappingMembers[m];
				$(isPayInput).prop('checked', mapping.isPay);
				$(isUserInputInput).prop('checked', mapping.isUserInput);
				$(amountInput).val(comm.addComma(mapping.amount));
				$(amountInput).prop('readonly', !mapping.isUserInput);
				$(amountInput).attr('data-is-pay', mapping.isPay);
			});
		});

		var totalAmountList = $(ENV.METRIX_ID).find('input[name="totalAmountPerMan"]');
		$.each(totalAmountList, function(i){
			$(this).val(comm.addComma(jskMetrix.totalAmounts[i].totalAmount));
		});
		
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
	
	var getDatas = function(){
		
		var jskMetrix = [];
		var totalAmounts = [];

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
			
			jskMetrix.push(metrix);
		});

		var totalAmountList = $(ENV.METRIX_ID).find('input[name="totalAmountPerMan"]');
		$.each(totalAmountList, function(i){
			var colid = $(this).parents('td').attr('data-colid');
			var $colHeader = $('[data-obj="memberName"][id="'+colid+'"]');
			
			var totalAmount = {
				member: {
					id: colid,
					name: $colHeader.text(),
					payment: $colHeader.next().text()*1
				},
				totalAmount: comm.removeComma($(this).val())*1
			};
			totalAmounts.push(totalAmount);
		});
		
		return {
			metrix: jskMetrix,
			totalAmounts: totalAmounts
		};
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