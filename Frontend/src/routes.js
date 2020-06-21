import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import Inicio from "views/Inicio/Inicio.js";
import UserProfile from "views/Perfil/Perfil.js";
import InventarioTableList from "views/Inventario/InventarioTableList.js";
import TableListEmpleados from "views/Empleados/TableListEmpleados.js";
import TableListPedidos from "views/TablaPedidos/TableListPedidos.js";
import Maps from "views/Maps/Maps.js";
import ListaDeVentas from "views/TablaVentas/TablaVentas.js";
import Venta from "views/Ventas/Venta.js";

const dashboardRoutes = [
  {
    path: "/inicio",
    name: "Inicio",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Inicio,
    layout: "/admin"
  },
  {
    path: "/tiendas",
    name: "Tiendas",
    rtlName: "لوحة القيادة",
    icon: "store",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/usuario",
    name: "Perfil de usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/inventario",
    name: "Inventario",
    rtlName: "لوحة القيادة",
    icon: "content_paste",
    component: InventarioTableList,
    layout: "/admin"
  },
  {
    path: "/empleados",
    name: "Empleados",
    rtlName: "لوحة القيادة",
    icon: "person_pin",
    component: TableListEmpleados,
    layout: "/admin"
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    rtlName: "لوحة القيادة",
    icon: "list_alt",
    component: TableListPedidos,
    layout: "/admin"
  },
  {
    path: "/ListaVentas",
    name: "Lista de Ventas",
    rtlName: "لوحة القيادة",
    icon: "list_alt",
    component: ListaDeVentas,
    layout: "/admin"
  },
  {
    path: "/venta",
    name: "Crear venta",
    rtlName: "لوحة القيادة",
    icon: "list_alt",
    component: Venta,
    layout: "/admin"
  }
];

export default dashboardRoutes;
