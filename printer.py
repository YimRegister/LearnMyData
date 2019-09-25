script = [

['Linear Regression', "<b>Linear regression</b> is one of the basic building blocks of machine learning. We use what we already know to try to make predictions. We do this by finding a mathematical equation that 'fits' the data we already have, and seeing if it does a good job at predicting new data!"],
['Collect Data', 'For the last 10 classes in college, rate your interest in the class and your final grade in the class. Input the interest on a scale of 1-7, and then the final Grade out of 4.0 for that class.'],
['Totals', "Let's start to unpack some data about <b>you</b>. You're looking at your own Interest data, for the last X classes at UW (totals). Every class has some interest value, and some course grade. "],
['Prediction', "Do you think there's a relationship between your interest in a class and the grade you received?"],
['Relationship', "This is your data, graphed on a 'scatter plot'. For every class, there is the rating you gave for interest. For that same class, there is the grade that you got in the class. <b>What can you say about the relationship between interest and grades in your data?</b>"],
['Finding Patterns', 'The idea behind Machine Learning is to find patterns in the data we already have (your interest and grade patterns) in order to predict new data. <b> If you give an interest rating of 2, what grade might you get?</b>'],
['Line of Best Fit', "How did you make the prediction? Well here's how machine learning makes it. You may have heard of <b>line of best fit</b>. That's how we are going to get started with Machine Learning. Because this is <i>linear</i> regression, our best fit line needs to be a straight line (that's the definition of <i>linear</i> here). <br><br> <b>Do you think your data could be <i>linear</i>?</b>"],
['Draw a Line', "What straight line fits <i>your</i> data? Draw a line that you think represents the relationship between your Interest and Grades. <b>Click anywhere to try to draw the line that 'fits' your data the best.</b> Reset to draw a different line. When you're ready, click Next."],
["The 'True Best' Fit", "The line you chose isn't exactly right. Turns out, there's an even better 'fit', which you can now see in green. <b>"],
['Residuals on your Chosen Line', "This is the line you chose to fit your Interest and Grades. The vertical lines show the vertical distance from the true points to the line you chose. Those distances are basically how 'good a fit' you chose."],
["Residuals on the 'True Best' Line", 'This is the <i>actual</i> line of best fit, with the distances shown. Finding the best line is about making those distances as small as possible.'],
['Representing the Data', "A good fitting model would represent the true data as closely as possible (while also being able to predict new stuff!). We can't do that perfectly with a straight line, but some straight lines are closer to the data than others."],
['Pieces of the Equation', "To really understand how machine learning works, we have to talk about how the line is computed. Before we cover <i>how</i> we got that best fit line, let's talk about the <b>parameters</b> (components) that make up a linear equation. People in Machine Learning might show it one way, like this: <br><img> but that's just a fancy way of saying: <center><br> <i>y = mx + b. </i></center><br>Finding the right <b>m</b> and finding the right <b>b</b> is what linear regression is all about."],
['Intercept', "What if we just change <b>b</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>. We won't touch <b>m</b> at all, and it will remain at 0. Now we have <i>y = 0x + 5</i>."],
['Slope', "What if we just change <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>m = .2</b>. We won't touch <b>b</b> at all, and it will remain at 0. Now we have <i>y = .2x + 0</i>."],
['y= mx + b', "What if we just change both <b>b</b> and <b>m</b> in the <i>y = mx + b</i> equation? Let's say <b>b = 5</b>, and <b>m = .2</b>. Now we have <i>y = .2x + 5</i>."],
['Guess and Check?', "How do we find the right <b>m</b> and <b>b</b> for your data? What if we guessed randomly until we found the right fit? You can start to see how ineffective this would be. There are an infinite number of parameters we could try. There's gotta be a better way!"],
['A Better Way',"Guessing randomly isn't really feasible. There is an infinite number of slopes and intercepts, and we would have to be really lucky to match the real data very well. Remember, the whole point of doing machine learning is to find a model that reasonably fits the data we see in the world (and generalizes to new data reliably!)"],
['Generalization', "While finding the models that fit the data might be useful, they're the most useful if they help us predict things about <i>new</i> data. In our case, you might want to know about your grades for a course next year. How interested are you in that class? Will our model work to predict the grade you'll get? How will it hold up on <i>new</i> data?"],

['Adding Features',"Rarely does linear regression use only <i>one</i> variable to predict an outcome (Interest to Grades). You can actually take other things into account in the model. In math, we can represent this by adding more theta terms (remember those?). What other features should we take into account when predicting your Grades in a class?"],
 ['Prediction', "Before we look at the real test point, let's try to use our model to predict the number of Comments that post got based on the number of Likes."],
['Performance', "Here's the real post! How did our model do? Could we do better? What did we do well? Describe what happened and what we know about our model."]
]

for li in script:
    print(li[0]+"\n\n" +li[1]+"\n\n")
