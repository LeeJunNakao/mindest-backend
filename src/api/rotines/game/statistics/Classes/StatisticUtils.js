class Utils{

    splitMatchesIntoDays(matches){
        const response = {}
        matches.forEach(match=>{
          const day = new Date(match.date).getDate();
          response[day]={
            difficulty:{}
          }
        })
        matches.forEach(match=>{
          const day = new Date(match.date).getDate();
          response[day].difficulty[match.difficulty]={
            points:[]
          }
        })
        matches.forEach(match=>{
          const day = new Date(match.date).getDate();
          
          response[day].difficulty[match.difficulty].points.push(match.points)
        })
        return response;
    }

    insertStatisticsInArray(array){
      array.forEach(item=>{
        for(let day in item.statistics.days){
          for(let difficulty in item.statistics.days[day].difficulty){
              const points = item.statistics.days[day].difficulty[difficulty].points
              let performance = this.calculatePerformance(points,difficulty);
              item.statistics.days[day].difficulty[difficulty].performance = performance;
          }
      }   
    });
  }

    calculatePerformance(points,difficulty){
        const numberOfMatches = points.length;
        const totalPoints = points.reduce((total,num)=>total+num);
        let performance = totalPoints/(numberOfMatches*difficulty);
        performance = (performance*100).toFixed(2);
        return performance;
    }

    returnArrayOfPoints(array,day,difficulty){
        return array[day].difficulty[difficulty].points;
    }
}

module.exports = Utils;