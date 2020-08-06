<%@ Page Title="Página principal" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication1._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1>CLIENTE SA <span> cree sus contactos y visualice la data</span> </h1>
            </hgroup>
            <p>
                Primera tarea del laboratorio de Software avanzado</p>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <ol class="round">
        <li class="one">
            <h5>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <asp:Label ID="Label1" runat="server" Text="Nombre: "></asp:Label>
                &nbsp;&nbsp;&nbsp;
                <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                &nbsp;&nbsp;
                <asp:Button ID="Button2" runat="server" Text="Crear Contacto" OnClick="Button2_Click" />
            </h5>
        </li>
        <li class="two">
            <h5>
                <asp:Button ID="Button1" runat="server" Text="Visualizar contactos" OnClick="Button1_Click" />
            </h5>
        </li>
        <li class="three">
            <asp:Table ID="myTable" runat="server" Width="100%"> 
                <asp:TableRow> 
                 <asp:TableCell>Contactos</asp:TableCell>  
                </asp:TableRow> 
            </asp:Table>
        </li>
    </ol>
</asp:Content>
