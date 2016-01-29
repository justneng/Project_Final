<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 15/7/2558
  Time: 15:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<script>

    $('#viewControlSelector').on('change',function(){

        alert('its WORKING !!!');

        if(this.value == 'Category'){

            $("#tblCategory").show();
            $("#tblSubCategory").hide();
        }else if(this.value == 'SubCategory'){
            $("#tblCategory").hide();
            $("#tblSubCategory").show();
        }else{alert('No God Please No');}
    })
</script>

<div class="container row">
    <h3>แก้ไขหมวดหมู่</h3>
    <hr>
</div>
<div class="row">
    <div class="col-md-5" align="right" style="margin-top: 20px;">
        <label><h4>แสดง</h4></label>
    </div>
    <div class="col-md-4" align="left" style="margin-top: 20px;">
        <select class="form-control" id="viewControlSelector">
            <option id = "selectSubCategory" value="SubCategory" selected></option>
            <option id = "selectCategory" value="Category">เฉพาะหมวดหมู่</option>
        </select>
    </div>
</div>
<br/>
<br/>

<div class="row">
    <div class="col-md-10 col-md-offset-1">
        <table class="table table-bordered" id = "tblCategory">
            <col width="80%"/>
            <col width="20%"/>
            <thead style="background-color: slategray">
                <tr>
                    <th style="text-align: center; color: white;">ชื่อหมวดหมู่หลัก</th>
                    <th style="text-align: center; color: white">แก้ไข</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ทดสอบหมวดหมู่หลัก</td>
                    <td style="text-align: center;">
                        <button type="button" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>ทดสอบหมวดหมู่หลัก</td>
                    <td style="text-align: center;">
                        <button type="button" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table table-bordered" id = "tblSubCategory">
            <col width="40%"/>
            <col width="40%"/>
            <col width="20%"/>
            <thead style="background-color: slategray">
                <tr>
                    <th style="text-align: center; color: white;">ชื่อหมวดหมู่หลัก</th>
                    <th style="text-align: center; color: white;">ชื่อหมวดหมู่ย่อย</th>
                    <th style="text-align: center; color: white">แก้ไข</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>JAVA</td>
                    <td>ทดสอบหมวดหมู่ย่อย1</td>
                    <td style="text-align: center;">
                        <button type="button" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>JAVA</td>
                    <td>ทดสอบหมวดหมู่ย่อย2</td>
                    <td style="text-align: center;">
                        <button type="button" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<%@include file="searchTemplateNew.jsp" %>

<script>

    $("#tblCategory").hide();

    $('#viewControlSelector').on('change',function(){
        if(this.value == 'Category'){
            $("#tblCategory").show();
            $("#tblSubCategory").hide();
        }else if(this.value == 'SubCategory'){
            $("#tblCategory").hide();
            $("#tblSubCategory").show();
        }else{alert('No God Please No');}
    })
</script>