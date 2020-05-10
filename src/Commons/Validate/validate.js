const validate = values => {
  const errors = {}
  const { title, description } = values
  if (!title) {
    errors.title = 'Vui lòng nhập tiêu đề'
  } else if (title.trim().length < 5) {
    errors.title = 'Tiêu đề phải từ 5 ký tự'
  }
  if (!description) {
    errors.description = 'Vui lòng nhập mô tả'
  }
  return errors
}

export default validate
