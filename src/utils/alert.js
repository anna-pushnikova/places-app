
import Swal from 'sweetalert2'

export default {
  install(Vue, options) {
    Vue.prototype.$swal = function(text, icon) {
      Swal.fire({
        toast: true,
        position: 'top-right',
        timer: 3000,
        icon,
        html: `
          <span class="ml-2 mb-2">${text}</span>
        `,
        showConfirmButton: false
      })
    }
  } 
}
