var vector_multiply_two = function(arr1,arr2){
  var total = [];
  for(var i=0; i< arr2.length; i++){
        //console.log(arr1[i],arr2[i]);
        total.push(arr1[i]*arr2[i]);
    }
    //console.log(total);
    return(total);

  }

var vector_multiply_one = function(n, arr,b=0){
  var total=[];
  for(var i=0; i< arr.length; i++){
        total.push((n*arr[i])+b);
    }
    return(total);
}
var vector_subtract = function(arr1, arr2){
  var total=[];
  for(var i=0; i< arr1.length; i++){
        total.push(arr1[i]-arr2[i]);
    }
    return(total);
}

var vector_add_one = function(arr, n){
  var total=[];
  for(var i=0; i< arr.length; i++){
        total.push(arr[i]+n);
    }
    return(total);
}


function add(a, b) {
  return a + b;
}

var gradient_descent= function(X,y, m_current=0, b_current=0, epochs=1000000, learning_rate=0.0003){
      console.log("running gd");
      var hold_all_params = [];
       var N = y.length;
       for(var i=0;i<epochs;i++){


            //var y_current = (m_current * X) + b_current
            var y_current = vector_multiply_one(m_current,X,b=b_current);


            //var cost = sum([data**2 for data in (y-y_current)]) / N
            var cost = 0;
            var residuals = vector_subtract(y,y_current);
            for(var j =0;j<residuals.length;j++){
                cost+=Math.pow(residuals[j],2);


              }
            cost=cost/N;



            var m_gradient = -(2/N) * (vector_multiply_two(X,residuals)).reduce(add, 0);

            var b_gradient = -(2/N) * (residuals).reduce(add, 0);



            m_current = m_current - (learning_rate * m_gradient);
            b_current = b_current - (learning_rate * b_gradient);
            if(i%1000==0){
              hold_all_params.push([m_current,b_current]);
            }


          }
       return ([m_current, b_current,cost,hold_all_params]);

}
