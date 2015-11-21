var app =  angular.module('myApp');

app.controller('MainCtrl', [
  '$scope'
, '$resource'
, '$linq'
, function($scope, $resource, $linq){

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

enumerator = $linq.Enumerable();

/* process research teams */
// {type: "team", id: 1, name: 'a', ftes: 10, expected_tpv:19, columns: [[], []]}

var team_raw_data = [
   { team_id: 1, team: 'Mck Other', emp_name: 'rachel hinds',  fte: 1}
,  { team_id: 2, team: 'Mck CGS EI', emp_name: 'rachel loebl', fte: 1 }
,  { team_id: 3, team: 'Bain Other', emp_name: 'Leo Queralt',  fte: 1 }
,  { team_id: 3, team: 'Bain Other', emp_name: 'Katie Weaver', fte: 1 }

,  { team_id: 4, team: 'HC Growth', emp_name: 'Melissa Nezamzadeh', fte: 1 }
,  { team_id: 4, team: 'HC Growth', emp_name: 'Beth Sapire', fte: 1 }
,  { team_id: 4, team: 'HC Growth', emp_name: 'Beth Sapire', fte: 1 }
,  { team_id: 5, team: 'Growth A', emp_name: 'Peter Calvanelli', fte: 1 }
,  { team_id: 5, team: 'Growth A', emp_name: 'Gabbi Lewin' , fte: 1 }
];

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
    item.expected_tpv = item.productivity* item.fte;
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


/* process model */
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
          ,  _Accounts: [
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
/* end process model */

  p_models.dropzones._Accounts = account_agg; 

  p_models.dropzones.Teams = team_agg; 

// console.log(account_agg_pre);
/* account variables */

/* end account variables */

/* account functions */

  var calc_growth = function (x){

    return parseFloat(x) + parseFloat(1) ; 
    //parseInt(x) + parseInt(y)  ;
  }

  $scope.angular_growth = calc_growth; 

/* end account functions */ 

  $scope.account_v1 = account_agg;

  $scope.team_v1 = team_agg; 

  $scope.models = p_models; 

  $scope.func = function(obj){
     var demand = 0; 
    // debugger;
    // returns length of array: obj.columns[0].length;
    //obj..foreach()
    obj.columns[0].forEach(function(item){
      demand += (item.expected_tpv * calc_growth(item.growth) )   
    }); 

    return demand;  
  }

}])

