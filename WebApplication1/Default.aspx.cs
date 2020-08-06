using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace WebApplication1
{
    public partial class _Default : Page
    {
        //La instancia al servicio se crea global para tener un acceso en los dos metodos que se utilizan
        //o si es el caso, en todos los que se lleguen a agregar
        ServiceReference1.administratorcontact100Client admin = new ServiceReference1.administratorcontact100Client();

        protected void Page_Load(object sender, EventArgs e)
        {
            //El servicio se integro al proyecto como referencia externa
            /*
             Si se quiere revisar el mismo se encuentra como ServiceReference1, en la seccion de Service References
             */
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            //cadena de mensaje para indicar si fue creado o no el cliente
            String mensajecreate = "No fue posible crear el cliente";
            //validacion de creacion de cliente y envio de data al web service
            if (admin.create("201403997" + TextBox1.Text, 0, null, 0))
            {
                //creacion exitosa
                mensajecreate = "El contacto se creo Exitosamente";
            }
            //Creacion de Alert que se mostrara a usuario al crear o no el contacto
            ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('" + mensajecreate + "');", true);
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //consumo de Web Service para recibir la data del web service
            ServiceReference1.readListResponse_list_item[] datos =admin.readList(0,1000000,"201403997",null,null,null,null);
            //recorrido del arreglo para la creacion dinamica de tabla con los contactos
            for (int i = 0; i < datos.Length; i++)
            {
                TableRow row = new TableRow();
                TableCell cell1 = new TableCell();
                cell1.Text = datos[i].name;
                row.Cells.Add(cell1);
                //Adicion de filas
                myTable.Rows.Add(row); 
            }
        }
    }
}