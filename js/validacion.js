document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('formularioLogin');
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');
    
    formularioLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const correoValido = validarCorreo(correoInput.value);
        if (!correoValido) {
            correoInput.classList.add('is-invalid');
            return;
        } else {
            correoInput.classList.remove('is-invalid');
        }
        
        if (contrasenaInput.value.trim() === '') {
            contrasenaInput.classList.add('is-invalid');
            return;
        } else {
            contrasenaInput.classList.remove('is-invalid');
        }
        
        window.location.href = 'index.html';
    });
    
    function validarCorreo(correo) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    }
});