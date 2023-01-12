import * as bootstrap from 'bootstrap';

(function () {
  'use strict' // Start of use strict

  const sidebar = document.querySelector('.sidebar')
  const sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleTop')

  if (sidebar) {
    const collapseElementList = [].slice.call(document.querySelectorAll('.sidebar .collapse'))
    const sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false })
    })

    for (const toggle of sidebarToggles) {
      // Toggle the side navigation
      toggle.addEventListener('click', function () {
        document.body.classList.toggle('sidebar-toggled')
        sidebar.classList.toggle('toggled')

        if (sidebar.classList.contains('toggled')) {
          for (const bsCollapse of sidebarCollapseList) {
            bsCollapse.hide()
          }
        }
      })
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', function () {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

      if (vw < 768) {
        for (const bsCollapse of sidebarCollapseList) {
          bsCollapse.hide()
        }
      }
    })
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over

  const fixedNaigation = document.querySelector('body.fixed-nav .sidebar')

  if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function (e) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

      if (vw > 768) {
        const e0 = e.originalEvent
        const delta = e0.wheelDelta || -e0.detail
        this.scrollTop += (delta < 0 ? 1 : -1) * 30
        e.preventDefault()
      }
    })
  }

  const scrollToTop = document.querySelector('.scroll-to-top')

  if (scrollToTop) {
    // Scroll to top button appear
    window.addEventListener('scroll', function () {
      const scrollDistance = window.pageYOffset

      // check if user is scrolling up
      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block'
      } else {
        scrollToTop.style.display = 'none'
      }
    })
  }
})() // End of use strict
