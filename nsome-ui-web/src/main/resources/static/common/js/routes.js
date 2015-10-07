$(function(){

    var AppRouter = new (Backbone.Router.extend({
        routes: {
        	""				: page.Trips.initPage,
        	"trips"			: page.Trips.initPage,
        	"trips/:tripId"	: page.Trips.initDetailPage,
        	"trips/:tripId/calculate"	: page.Calculator.initPage,
        	"trips/:tripId/calculate/billing": page.Billing.initPage,
        	"trips/:tripId/calculate/billing/:memberId": page.Billing.initPage
            
        },

    }));

    Backbone.history.start();

});