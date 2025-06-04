const frutas = [
    { id: 1, nombre: "Arandano", precio: 5000, img: "img/arandano.jpg" },
    { id: 2, nombre: "Banana", precio: 1000, img: "img/banana.jpg" },
    { id: 3, nombre: "Frambuesa", precio: 4000, img: "img/frambuesa.jpg" },
    { id: 4, nombre: "Frutilla", precio: 3000, img: "img/frutilla.jpg" },
    { id: 5, nombre: "Kiwi", precio: 2000, img: "img/kiwi.jpg" },
    { id: 6, nombre: "Mandarina", precio: 800, img: "img/mandarina.jpg" },
    { id: 7, nombre: "Manzana", precio: 1500, img: "img/manzana.jpg" },
    { id: 8, nombre: "Naranja", precio: 9000, img: "img/naranja.jpg" },
    { id: 9, nombre: "Pera", precio: 2500, img: "img/pera.jpg" },
    { id: 10, nombre: "Anana", precio: 3000, img: "img/anana.jpg" },
    { id: 11, nombre: "Pomelo Amarillo", precio: 2000, img: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "Pomelo Rojo", precio: 2000, img: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "Sandia", precio: 5000, img: "img/sandia.jpg" }
];

const alumno=
{
    dni:40128995,
    nombre:"Agustin",
    apellido:"Lopez",
}

// Muestra los datos del alumno en el header, traigo con querySelector el div con la clase nombreAlumno usando el . y despues lo piso usando innerHTML y completando con los datos del objeto alumno.

function imprimirDatosAlumno()
{
    const divNombre=document.querySelector(".nombreAlumno");
    divNombre.innerHTML = `
  <p>${alumno.nombre} ${alumno.apellido}</p>
`;
}

// Muestra en pantalla una lista de frutas, traigo con getElementsByClassName el div con la clase contenedor-productos, luego recorro el array frutas y voy concatenando en una variable html un string con la estructura de cada fruta, al final lo muestro en el contenedor usando innerHTML.

function mostrarFrutas(productosAMostrar)
{
const contenedor = document.getElementsByClassName('contenedor-productos')[0];
let html = "";

// Por cada fruta, arma una tarjeta con imagen, nombre, precio y botón para agregar al carrito
productosAMostrar.forEach(prod => {
  html += ` 
      <div class="producto-info">
        <img src="${prod.img}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button class="boton-agregar" onclick="agregarCarrito(${prod.id})">Agregar al carrito</button>
      </div>
  `;
});

// Inserta todo el contenido en el contenedor
contenedor.innerHTML = html;
}

// Ordena las frutas por nombre, uso la funcion sort() para ordenar el array de frutas, utilizo los ... para crear una copia del array original y evitar modificarlo directamente. Luego, muestro las frutas ordenadas llamando a la funcion mostrarFrutas.
function ordenarPorNombre() {
  const frutasOrdenadas = [...frutas].sort((a, b) => {
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
    return 0;
  });

  mostrarFrutas(frutasOrdenadas);
}

// Idem ordenarPorNombre, usa la misma logica solo que en vez de ordenar por nombre, ordena por precio. Utilizo el metodo sort() para ordenar el array de frutas, comparando los precios de cada fruta. Luego, muestro las frutas ordenadas llamando a la funcion mostrarFrutas.
function ordenarPorPrecio() {
  const frutasOrdenadas = [...frutas].sort((a, b) => a.precio - b.precio);
  mostrarFrutas(frutasOrdenadas);
}


// Detecta cuando se escribe algo en el input y ejecuta el filtro
const input = document.querySelector('.barra-busqueda');
input.addEventListener("input", filtrarFrutas);


//Capturo el valor del input en texto y filtro el array de frutas usando el metodo filter(), comparando si el nombre de cada fruta incluye el texto ingresado, pasado por un toLowerCase. Finalmente, llamo a la funcion mostrarFrutas y le paso el array filtrado para mostrar las frutas filtradas.
function filtrarFrutas() {
  const texto = input.value.toLowerCase();

  const frutasFiltradas = frutas.filter(prod =>
    prod.nombre.toLowerCase().includes(texto)
  );

  mostrarFrutas(frutasFiltradas);
}


// Inicializa un carrito vacío, que es un array donde se irán agregando los productos seleccionados, tambien sirve para mostrar el carrito vacio al principio.
let carrito = [];

//Agrega una fruta al carrito, recibe una id de fruta para agregar, busca esa id usando el metodo find() en el array de frutas, si la encuentra, le hace un push al carrito agregando el objeto, muestra por consola el producto agregado y llama a la funcion mostrarCarrito para actualizar la vista del carrito. Si no encuentra la fruta, no hace nada.
function agregarCarrito(id)
{
    const fruta = frutas.find(prod => prod.id === id);
    carrito.push(fruta);
    console.log(`Producto agregado: ${fruta.nombre}`);
    mostrarCarrito(carrito);
}

// Elimina una fruta del carrito, recibe una id de fruta para eliminar, busca la fruta usando findIndex() para saber el indice de la fruta en el array, si la encuentra, usa splice() se le pasa el index y el numero 1 para eliminar un solo elemento desde esa posicion, luego guardo la fruta eliminada en una variable para mostrarla por consola, finalmente llama a la funcion mostrarCarrito para actualizar la vista del carrito, guarda el carrito en localStorage para persistir los cambios.
function eliminarDelCarrito(id)
{
    const index = carrito.findIndex(prod => prod.id === id);
    if (index > -1) {
        const frutaEliminada = carrito.splice(index, 1);
        console.log(`Producto eliminado: ${frutaEliminada[0].nombre}`);
        mostrarCarrito(carrito);
    }
    guardarCarrito();
}



//Capturo por id los items del carrito, el contador del carrito y el precio total del carrito, si el carrito esta vacio, muestro un mensaje de que no hay frutas agregadas, de lo contrario, muestro lo que se haya agregado, recorro el array del carrito y por cada fruta sumo 1 al contador, concateno en una variable html auxiliar, muestro todo el carrito en el contenedor usando innerHTML, luego calculo el total del carrito usando reduce() y lo muestro en el elemento totalCarrito
function mostrarCarrito(carrito)
{
    const contenedorCarrito = document.querySelector('#items-carrito');
    const contadorCarrito = document.querySelector('#contador-carrito');
    const totalCarrito = document.querySelector('#precio-total');
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>No hay frutas en el carrito</p>";
        contadorCarrito.textContent = "0"; 
        totalCarrito.textContent = "$0"; 
        return;
    }
    // Si hay frutas, actualiza el contador y el total
    contadorCarrito.textContent = carrito.length; 
    
    let html = "";
    // Recorro el carrito y voy concatenando en html la estructura de cada fruta, con su nombre, precio y un boton para eliminarla del carrito.
    carrito.forEach(prod => {
        html += `
            <li id="items-carrito">
                <p class="nombre-item">${prod.nombre} - $${prod.precio}</p>
                <button class="boton-eliminar" onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
            </li>
        `;
    });
    contenedorCarrito.innerHTML = html;
    // Utilizo el metodo reduce() para sumar los precios de cada fruta en el carrito, acc es el acumulador que empieza en 0 y prod es cada fruta del carrito, al final muestro el total en el elemento totalCarrito.
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalCarrito.textContent = `$${total}`; 
    // Guardamos el carrito en localStorage para persistir los cambios
    guardarCarrito(); 
}

// Vacía el carrito, simplemente asigna un array vacío al carrito y llama a la funcion mostrarCarrito para actualizar la vista del carrito.
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito(carrito);
  guardarCarrito(); 
}
// Guarda el carrito en localStorage, convierte el carrito a un string usando JSON.stringify() y lo guarda en localStorage con la clave 'carrito'.
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
//Carga desde el localStorage el carrito con la key carrito si existe, utiliza Json.parse() para convertir el string en un array y lo retorna, si no existe en el local storage retorna un array vacio
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    return carrito;
  }
    return [];
}

//Funcion que inicializa todas las funciones que tiene dentro al comenzar el script, primero revisa si hay un carrito en el localStorage, imprime los datos del alumno, luego muestra todas las frutas y finalmente muestra el carrito vacío.

function init()
{
    carrito = cargarCarrito(); // Carga el carrito desde localStorage

    imprimirDatosAlumno();
    mostrarFrutas(frutas); // Muestra todas las frutas por defecto
    mostrarCarrito(carrito); // Muestra el carrito vacío al inicio
}

init();