<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <!-- FontAwesome CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" rel="stylesheet" crossorigin="anonymous">
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap" rel="stylesheet">
</head>
<body>
<div class="container-fluid">
    <div class="row mt-50">
        <div class="col-12 text-center">
            <h1>magicSlider</h1>
            <p>Made using pure JS <small class="text-muted">(No dependencies)</small></p>
        </div>
    </div>
    <div class="row mb-50">
        <div class="col-12">
            <h3>How to use</h3>
            <br/>
            <p>Include the magicSlider.min.js in to your html page</p>
            <code>
                &lt;script src="js/magicSlider.min.js"&gt;&lt;/script&gt;
            </code>
            <br/>
            <br/>
            <p>Then add the container div to the html</p>
            <code>
                &lt;div id="slider"&gt;&lt;/div&gt;
            </code>
            <br/>
            <br/>
            <p>Add this small and simple javascript code to your html</p>
<pre>
&lt;script type="text/javascript"&gt;
    var slider = new magicSlider('slider', {
        min: 2000,
        max: 2015,
        interval: 1,
        rangeColor: '#f00',
        startPoints: [2003, 2012]
    });
&lt;/script&gt;
</pre>
        </div>
    </div>
    <div class="row mb-50">
        <div class="col-12 col-md-10 col-lg-8">
            <h3>Parameter configuration</h3>
            <br/>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Default</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>min</td>
                        <td>The minimum value (left side value) of the range</td>
                        <td>Decimal</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>max</td>
                        <td>The maximum value (right side value) of the range</td>
                        <td>Decimal</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>values</td>
                        <td>Full value array for the range</td>
                        <td>Array</td>
                        <td>null</td>
                    </tr>
                    <tr>
                        <td>interval</td>
                        <td>Step size of the range slider values</td>
                        <td>Decimal</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>labelInterval</td>
                        <td>Axis label step size of the range slider</td>
                        <td>Decimal</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>onlyEndLabels</td>
                        <td>Whether to show only end values of the slider</td>
                        <td>Boolean</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>pointerValues</td>
                        <td>Whether to show pointer values on top</td>
                        <td>Boolean</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>pointerImage</td>
                        <td>Override default pointer shapes with an image</td>
                        <td>Text</td>
                        <td>null</td>
                    </tr>
                    <tr>
                        <td>rangeColor</td>
                        <td>Color of the axis between selected range</td>
                        <td>Hex Code</td>
                        <td>#3498db</td>
                    </tr>
                    <tr>
                        <td>startPoints</td>
                        <td>Default starting points for range slider pointers</td>
                        <td>Array</td>
                        <td>[0, 10]</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-10 col-lg-8">
            <h3>Methods to Use</h3>
            <br/>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                        <th>Return Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>init()</td>
                        <td>Initiate create slider</td>
                        <td>Object</td>
                    </tr>
                    <tr>
                        <td>getMin()</td>
                        <td>Get left side value</td>
                        <td>decimal</td>
                    </tr>
                    <tr>
                        <td>getMax()</td>
                        <td>Get right side value</td>
                        <td>decimal</td>
                    </tr>
                    <tr>
                        <td>getRange()</td>
                        <td>Get both left and right side values</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>onChange(callback)</td>
                        <td>Get action on range value change with a callback function</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>setValues(min, max)</td>
                        <td>Set left side and right side range values</td>
                        <td>Object</td>
                    </tr>
                    <tr>
                        <td>destroy()</td>
                        <td>Destroy the slider content</td>
                        <td>null</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>
