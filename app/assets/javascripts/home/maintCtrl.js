var app =  angular.module('myApp');

app.controller('MainCtrl', [
  '$scope'
, '$resource'
, '$linq'
, 'holidays'
, 'holiday'
, '$filter'
, function($scope, $resource, $linq, holidays, holiday, filter){
/*

framework - models array 
1. the research team section and account section should be structured based on 
the models array 

data model 
data that we read
1. account raw data
  cols: name id, region, country, pa 
2. research team raw data

intermediate arrays
1. account agg - takes account raw data, groups by account id and name
options
  details
  default should populate regions with all, and PAs with all 
  , however, it should 

a) user should be able to split account by regions and PAs, the combinations they 
come up with should be reflected in this array (account agg)

2. research team agg - should consume research team raw data and group by team, BU. 
should provide FTEs, the ultimate value should be adjustable

output arrays

*/

/* UI */  
    $scope.settings = function(){
      if(this.show_settings==false)
        {this.show_settings=true; }
      else this.show_settings = false;

    };

    $scope.show_settings =true; 

    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

/* end UI */

/* UI - Filters - BU Team Pod */



/* end UI - Filters - BU Team Pod */


/* holidays */

/*backend holiday methods */ 

$scope.holidays = holidays.query();

$scope.holidate= null; 

$scope.add_holiday = function(id, h_date, desc){

  var new_holiday = holidays.create( {country_id: id, holiday_date: h_date, description: desc}); 
  $scope.holidays.push(new_holiday);
  $scope.descrip = ''; 
}

$scope.remove_holiday = function(h_id)
{ 
   holiday.delete({id: h_id}); 
   $scope.holidays = holidays.query(); 
}
  /*END backend holiday methods */   
  /* holiday table */ 
  $scope.sortType = 'holiday_date'; 
  $scope.sortReverse = false; 

  /* end holiday table */    

    $scope.countries = [
        {country: 'Australia', abbreviation: 'AU', id: 867},
        {country: 'China', abbreviation: 'CN', id: 899 },
        {country: 'France', abbreviation: 'FR', id: 930 },
        {country: 'Germany', abbreviation: 'DE', id: 937 },
        {country: 'Hong Kong', abbreviation: 'HK', id: 953 },
        {country: 'India', abbreviation: 'IN', id: 956 },
        {country: 'Ireland', abbreviation: 'IE', id: 958 },
        {country: 'Japan', abbreviation: 'JP', id: 962 },
        {country: 'Singapore', abbreviation: 'SG', id: 1045 },
        {country: 'South Korea', abbreviation: 'KR', id: 1052 },
        {country: 'United Arab Emirates', abbreviation: 'AE', id: 1078 },
        {country: 'United Kingdom', abbreviation: 'GB', id: 1079 },
        {country: 'United States', abbreviation: 'US', id: 1080 },
    ];

$scope.selectedCountryID = 0; 

/* end holidays */

enumerator = $linq.Enumerable();
/* process research teams */
// {type: "team", id: 1, name: 'a', ftes: 10, expected_tpv:19, columns: [[], []]}

var team_raw_data = [
   {business_unit: 'professional services firms research', pod: "A", team_id: 1, team: 'Mck Other', emp_name: 'rachel hinds',  fte: 1}
,  {business_unit: 'professional services firms research', pod: "A", team_id: 2, team: 'Mck CGS EI', emp_name: 'rachel loebl', fte: 1 }
,  {business_unit: 'professional services firms research', pod: "B", team_id: 3, team: 'Bain Other', emp_name: 'Leo Queralt',  fte: 1 }
,  {business_unit: 'professional services firms research', pod: "B", team_id: 3, team: 'Bain Other', emp_name: 'Katie Weaver', fte: 1 }

,  {business_unit: 'americas financial services research', pod: "C", team_id: 4, team: 'HC Growth', emp_name: 'Melissa Nezamzadeh', fte: 1 }
,  {business_unit: 'americas financial services research', pod: "C", team_id: 4, team: 'HC Growth', emp_name: 'Beth Sapire', fte: 1 }
,  {business_unit: 'americas financial services research', pod: "D", team_id: 4, team: 'HC Growth', emp_name: 'Beth Sapire', fte: 1 }
,  {business_unit: 'americas financial services research', pod: "D", team_id: 5, team: 'Growth A', emp_name: 'Peter Calvanelli', fte: 1 }
,  {business_unit: 'americas financial services research', pod: "D", team_id: 5, team: 'Growth A', emp_name: 'Gabbi Lewin' , fte: 1 }
]; 

/*  filter data */ 

  var grp1 =  _.groupBy(
     _.map(team_raw_data, function(item){
    return _.pick(item, ['business_unit', 'pod', 'team']); 
  })
     , 'business_unit');




  $scope.lo_test = grp1; 

/* end filter data */ 

  var team_agg = enumerator.From(team_raw_data)
      .GroupBy("{team_id: $.team_id, team: $.team}", null,
               function (key, g) {
                   return {
                     team: key.team,
                     team_id: key.team_id, 
                     fte: g.Sum("$.fte")
                   }
              },
              "$.team_id + '-' + $.team"
      )
      .ToArray();

  team_agg.forEach(function(item){
    item.productivity = 60;
    item.assigned_tpv = 0;
    item.type= "team"; 
    item.columns = [ [ ] ]; 
  });

  team_agg.forEach(function(item){
    item.expected_tpv = item.productivity * item.fte;
  }); 
/* end process research teams */


/* process accounts */ 
    var account_raw_data = [
    { id: 10, name:'goldman', volume: 10, region: 'Asia', country:'HK', pa: 'hc'},
    { id: 10, name:'goldman', volume: 34, region: 'EMEA', country:'Sweden', pa:'tmt'},
    { id: 11, name:'perry', volume: 23, region: 'EMEA', country:'Denmark', pa:'hc'},
    { id: 11, name:'perry', volume: 20, region: 'Americas', country:'USA', pa:'tmt'}];
/* process accounts */

    var account_agg = enumerator.From(account_raw_data)
        .GroupBy("{id: $.id, name: $.name}", null,
                 function (key, g) { 
                     return {
                       name: key.name,
                       id: key.id, 
                       TPV: g.Sum("$.volume")
                     }
                },
                "$.id + '-' + $.name"
        )
        .ToArray();

//modifying account_agg_pre to match fields in below p_models.templates.account type 
    account_agg.forEach(function(item){
      item.type = "account"; 
      item.region = 'all'; 
      item.pa = 'all';
      item.expected_tpv = item.TPV; 
      item.growth=.2;

    });
/* end process accounts */


/* structure for account team model */
    var p_models = {
        selected: null,
        templates: [
            {type: "account", name:'abc', id: 2, tpv: 12, region: 'all', pa: 'all', expected_tpv: 0, growth: .1},
            {type: "team", team_id: 1, team: 'a', fte: 10, productivity: 60, expected_tpv:19, columns: []}
            // [[], []] 
        ],
        dropzones: {
            Teams: [
                   { type: 'team'
                   , team_id: 78
                   , team: 'mck other'
                   , fte: 1 
                   , productivity: 50 
                   , assigned_tpv: 10
                   , expected_tpv: 60
                   , columns: [ [ ] ]
                   }
                   , { type: 'team' 
                   , team: 'bain other'
                     , team_id: 78 
                     , columns: [  ]
                   }
                 ]
          ,  Accounts: [
                {
                    name: 'abcc',
                    id: 9,
                    tpv: 12, 
                    type: "account",
                    region: 'all', 
                    pa: 'all' 
                },
                {
                    "type": "account",
                    name: 'abcc', 
                    "id": 8,
                    tpv: 12, 
                    region: 'all', 
                    pa: 'all'
                }]
        }
  }
/* end structure for account team model */

/* initialize account team model */

  p_models.dropzones.Accounts = account_agg;

  p_models.dropzones.Teams = team_agg;

  $scope.models = p_models;

/* end initialize account team model */

/* account functions */

  var calc_growth = function (x){

    return parseFloat(x) + parseFloat(1) ; 
    //parseInt(x) + parseInt(y)  ;
  }

  $scope.angular_growth = calc_growth; 

  $scope.func = function(obj){
     var demand = 0; 

      obj.columns[0].forEach(function(item){
      demand += (item.expected_tpv * calc_growth(item.growth) )   
    }); 

    return demand;  
  }
/* end account functions */

/* drag and drop 2 */

        $scope.centerAnchor = true;

        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}

        $scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];

        $scope.droppedObjects1 = account_agg;

        $scope.droppedObjects2= team_agg;

        $scope.onDropComplete1=function(data,evt){
          console.log("on drop complete 1");
            var index = $scope.droppedObjects1.indexOf(data);
            if (index == -1 && data !=null)
            $scope.droppedObjects1.push(data);
        }

        $scope.onDragSuccess1=function(data,evt){
             
            var index = $scope.droppedObjects1.indexOf(data);
            // console.log("DRS 1, index value: " + index);
            
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
                // console.log("on drag success 1");
            }
        }

         $scope.onDropComplete2=function(teamIndex, data, evt){

            var index = $scope.droppedObjects2[teamIndex].columns[0].indexOf(data);
            // console.log("on drop complete 2 team index is " + teamIndex + ". index is " + index);

            if (index == -1 && data!= null ) {
                $scope.droppedObjects2[teamIndex].columns[0].push(data);
            }

        }

        $scope.onDragSuccess2=function(teamIndex, data, evt){

            var index = $scope.droppedObjects2[teamIndex].columns[0].indexOf(data);
              // console.log("DRS 2" + " team index is " + teamIndex + ". index is: " + index );

            if (index > -1) {
                $scope.droppedObjects2[teamIndex].columns[0].splice(index, 1);
                // console.log("DRS 2 splicing data");
            }
        }

        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }

/* END drag and drop 2 */


}])

