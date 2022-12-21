import {Router} from '@jneander/activity-routing'

export const router = new Router()

router.add('home', '/')

router.within('/users', usersContext => {
  usersContext.add('listUsers', '/')

  usersContext.within('/:id', userContext => {
    userContext.add('showUser', '/')

    userContext.add('editUser', '/edit')
  })
})

router.add('notFound', '*')
