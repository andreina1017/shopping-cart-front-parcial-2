const API_URL = 'https://dummyjson.com';
const ENDPOINTS = {
    usuarios: '/users',
    productos: '/products',
    carritos: '/carts'
};

async function cargarUsuarios() {
    try {
        const respuesta = await fetch(`${API_URL}${ENDPOINTS.usuarios}`);
        const datos = await respuesta.json();
        mostrarUsuarios(datos.users);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

function mostrarUsuarios(usuarios) {
    const contenedor = document.getElementById('contenedorUsuarios');
    contenedor.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col-md-4 mb-4';
        tarjeta.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${usuario.firstName} ${usuario.lastName}</h5>
                    <p class="card-text">${usuario.email}</p>
                    <button onclick="mostrarDetallesUsuario(${usuario.id})" class="btn btn-primary">Ver Detalles</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

async function mostrarDetallesUsuario(id) {
    try {
        const respuesta = await fetch(`${API_URL}${ENDPOINTS.usuarios}/${id}`);
        const usuario = await respuesta.json();
        
        const modal = document.getElementById('modalUsuario');
        const tituloModal = document.getElementById('tituloModalUsuario');
        const cuerpoModal = document.getElementById('cuerpoModalUsuario');
        
        tituloModal.textContent = `Usuario: ${usuario.firstName} ${usuario.lastName}`;
        cuerpoModal.innerHTML = `
            <p><strong>Nombre completo:</strong> ${usuario.firstName} ${usuario.lastName}</p>
            <p><strong>Edad:</strong> ${usuario.age || 'No especificado'}</p>
            <p><strong>Género:</strong> ${usuario.gender || 'No especificado'}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Teléfono:</strong> ${usuario.phone}</p>
            <p><strong>Dirección:</strong> ${usuario.address?.address || 'No especificada'}, ${usuario.address?.city || ''}</p>
        `;
        
        const modalBootstrap = new bootstrap.Modal(modal);
        modalBootstrap.show();
    } catch (error) {
        console.error('Error al cargar detalles del usuario:', error);
    }
}

async function cargarProductos() {
    try {
        const respuesta = await fetch(`${API_URL}${ENDPOINTS.productos}`);
        const datos = await respuesta.json();
        mostrarProductos(datos.products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedorProductos');
    contenedor.innerHTML = '';
    
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col';
        tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text">${producto.brand}</p>
                    <p class="card-text">$${producto.price}</p>
                    <button onclick="mostrarDetallesProducto(${producto.id})" class="btn btn-primary">Ver Detalles</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

async function mostrarDetallesProducto(id) {
    try {
        const respuesta = await fetch(`${API_URL}${ENDPOINTS.productos}/${id}`);
        const producto = await respuesta.json();
        
        const modal = document.getElementById('modalProducto');
        const tituloModal = document.getElementById('tituloModalProducto');
        const cuerpoModal = document.getElementById('cuerpoModalProducto');
        
        tituloModal.textContent = producto.title;
        cuerpoModal.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${producto.thumbnail}" class="img-fluid mb-3" alt="${producto.title}">
                </div>
                <div class="col-md-6">
                    <p><strong>Marca:</strong> ${producto.brand}</p>
                    <p><strong>Precio:</strong> $${producto.price}</p>
                    <p><strong>Descuento:</strong> ${producto.discountPercentage}%</p>
                    <p><strong>Rating:</strong> ${producto.rating}/5</p>
                    <p><strong>Stock:</strong> ${producto.stock}</p>
                    <p><strong>Categoría:</strong> ${producto.category}</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <p><strong>Descripción:</strong> ${producto.description}</p>
                </div>
            </div>
        `;
        
        const modalBootstrap = new bootstrap.Modal(modal);
        modalBootstrap.show();
    } catch (error) {
        console.error('Error al cargar detalles del producto:', error);
    }
}

async function cargarCarritos() {
    try {
        const respuesta = await fetch(`${API_URL}${ENDPOINTS.carritos}`);
        const datos = await respuesta.json();
        mostrarCarritos(datos.carts);
    } catch (error) {
        console.error('Error al cargar carritos:', error);
    }
}

function mostrarCarritos(carritos) {
    const contenedor = document.getElementById('contenedorCarritos');
    contenedor.innerHTML = '';
    
    carritos.forEach(carrito => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col-md-6 mb-4';
        tarjeta.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Carrito #${carrito.id}</h5>
                    <p class="card-text">Usuario: ${carrito.userId}</p>
                    <p class="card-text">Total: $${carrito.total}</p>
                    <p class="card-text">Productos: ${carrito.totalProducts}</p>
                    <button onclick="mostrarDetallesCarrito(${carrito.id})" class="btn btn-primary">Ver Detalles</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

async function mostrarDetallesCarrito(id) {
    try {
        const respuesta = await fetch(`${API_URL}${ENDPOINTS.carritos}/${id}`);
        const carrito = await respuesta.json();
        
        const modal = document.getElementById('modalCarrito');
        const tituloModal = document.getElementById('tituloModalCarrito');
        const cuerpoModal = document.getElementById('cuerpoModalCarrito');
        
        tituloModal.textContent = `Carrito #${carrito.id}`;
        
        let tablaProductos = `
            <h5>Productos en el carrito (${carrito.totalProducts})</h5>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        carrito.products.forEach(producto => {
            tablaProductos += `
                <tr>
                    <td>${producto.title}</td>
                    <td>${producto.quantity}</td>
                    <td>$${producto.price}</td>
                    <td>$${producto.total}</td>
                </tr>
            `;
        });
        
        tablaProductos += `
                    </tbody>
                </table>
            </div>
            <div class="text-end">
                <h5>Total del carrito: $${carrito.total}</h5>
            </div>
        `;
        
        cuerpoModal.innerHTML = `
            <p><strong>Usuario ID:</strong> ${carrito.userId}</p>
            ${tablaProductos}
        `;
        
        const modalBootstrap = new bootstrap.Modal(modal);
        modalBootstrap.show();
    } catch (error) {
        console.error('Error al cargar detalles del carrito:', error);
    }
}