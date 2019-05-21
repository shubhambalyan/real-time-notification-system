<!DOCTYPE HTML>
<html>
<head>
<title>Notifications</title>
<link rel="stylesheet" type="text/css" href="maincss.css">
</head>
<body>

<?php
function edit($note) {
   $note = trim($note);
   $note = htmlentities($note);
   return $note;
}
$nmsg=$nlink=$msg=$link="";
$cat=$ncat="";
if($_SERVER["REQUEST_METHOD"]=="POST"){
   if(empty($_POST["msg"])){
     $nmsg="Message is Needed";
   } 
   else{
     $msg=edit($_POST["msg"]);
   }
   $link=edit($_POST["link"]);
   //echo $link;
   if(empty($_POST["link"])){
     $nlink="URL/Link is Needed";
   } 
   else{
     $link=edit($_POST["link"]);
     if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$link)) {
       $nlink = "URL/Link is Not Valid";
     }
   }
   
   if(empty($_POST["cat"])){
       $ncat="Category is Needed";
   }
   else{
       $cat=edit($_POST["cat"]);
       //echo $cat;
       if($cat=="--Select Category--")
           $ncat="Category is Invalid";
//       else if($cat=="Order")
//           $link="";
   }

$insertmsg="";
if($nmsg==""&&$nlink==""&&$ncat=="") {
//$insertmsg="A";
$server="192.168.1.20";
$username="shubham";
$password="shubham";
$dbname="shubham";
$con=mysqli_connect($server,$username,$password,$dbname);

if(!$con) {
die("Fail Connection: ".mysqli_connect_error());
}
$datetime=date("Y-m-d H-i-s");
$sql="INSERT INTO notiftable (message,category,datecreated,link) VALUES ('$msg','$cat','$datetime','$link')";
if(mysqli_query($con,$sql)) {
$insertmsg="New Notification Created";
}
else {
$insertmsg="Error: ".mysqli_error($con);
}
mysqli_close($con);
}
}
?>

<h2>NOTIFICATION SYSTEM</h2><br>
<form name="frm" method="post" action="<?php echo htmlentities($_SERVER['PHP_SELF']);?>">
   <label>Category:<span class="not2">*</span></label><br>
   <select name="cat" autofocus id="five">
       <option >--Select Category--</option>
       <option value="Order">Order</option>
       <option value="Query">Query</option>
       <option value="Quotation">Quotation</option>
       <option value="Inventory">Inventory</option>
       <option value="Vendor">Vendor</option>
       <option value="Customer">Customer</option>
       <option value="Distributor">Distributor</option>
   </select>
   <span class="not2"><?php echo $ncat;?></span>
   <br><br>
   <label>Message:<span class="not2">*</span></label><br><textarea name="msg" placeholder="Enter the Message"></textarea>
   <span class="not2"><?php echo $nmsg;?></span>
   <br>
   <label>Link:<span class="not2">*</span></label><br><input id="three" name="link" placeholder="URL/Link" >
   <!--span class="not2"><?php //echo $nlink;?></span-->
   <br><br>
   <div class="two">
   <input type="submit" name="submit" value="Submit To Database" id="one">
   </div>
<span class="not2"><?php echo $insertmsg;?></span>
</form>
<p><span class="not1">* Required Field.</span></p>
<script type="text/javascript">
    var link=document.getElementById('three');
    var down=document.getElementById('five');
    down.onchange=function(){
          var k=down.value;
          var j="";
          //alert(k);
          if(k=="Order")
              j="http://pa.rapidkart.com/?urlq=chkorder";
          else if(k=="Query")
              j="http://pa.rapidkart.com/?urlq=enquiry/view";
          else if(k=="Quotation")
              j="http://pa.rapidkart.com/?urlq=quotation/view";
          else if(k=="Inventory")
              j="http://pa.rapidkart.com/?urlq=inventory-mgmt";
          else if(k=="Vendor")
              j="http://pa.rapidkart.com/?urlq=vendor/view";
          else if(k=="Customer")
              j="http://pa.rapidkart.com/?urlq=customer/view/A";
          else if(k=="Distributor")
              j="http://pa.rapidkart.com/?urlq=distributor/view";
          link.value=j; 
    }
</script>
</body>
</html>