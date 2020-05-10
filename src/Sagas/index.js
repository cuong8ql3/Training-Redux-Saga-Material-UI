import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select,
  takeEvery,
} from 'redux-saga/effects'
import * as taskTypes from '../Constants/task'
import { getList, addTask, updateTask, deleteTask } from '../apis/task'
import { STATUS_CODE, STATUSES } from '../Constants'
import {
  fetchListTask,
  fetchListTaskSuccess,
  fetchListTaskFailed,
  // filterTaskSuccess,
  addTaskSuccess,
  addTaskFailed,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskSuccess,
  deleteTaskFailed,
} from '../Actions/task'
import { showLoading, hideLoading } from '../Actions/ui'
import { hideModal } from '../Actions/modal'

/**
 * B1: Thực thi action fetch task
 * B2: Gọi api
 * ->>> hiển thị thanh tiến trình (loading) ->> action showLoading
 * B3: kiểm tra Status code
 * Nếu thành công...
 * Nếu thất bại...
 * B4: Tắt loading
 * B5: Thực thi các công việc tiếp theo...
 */
function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK) // lắng nghe Action Fetch Task mới thực thi
    yield put(showLoading()) // action showLoading
    const { params } = action.payload
    const resp = yield call(getList, params) // block call cho đến khi xong
    const { status, data } = resp

    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetchListTaskSuccess
      yield put(fetchListTaskSuccess(data))
    } else {
      // dispatch action fetchListTaskFailed
      yield put(fetchListTaskFailed(data))
    }
    yield delay(1000)
    yield put(hideLoading())
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(800)
  const { keyword } = payload
  yield put(
    fetchListTask({
      q: keyword,
    })
  )
  // const { keyword } = payload
  // const list = yield select(state => state.task.listTask)
  // const filteredList = list.filter(task =>
  //   task.title.toLowerCase().includes(keyword.trim().toLowerCase())
  // )
  // yield put(filterTaskSuccess(filteredList))
}
// Add Task
function* addTaskSaga({ payload }) {
  const { title, description } = payload
  yield put(showLoading())
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  })
  const { data, status } = resp
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data))
    yield put(hideModal())
  } else {
    yield put(addTaskFailed(data))
  }
  yield delay(1000)
  yield put(hideLoading())
}

// Update Task
function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload
  const taskEditing = yield select(state => state.task.taskEditing)
  yield put(showLoading())
  const resp = yield call(
    updateTask,
    {
      title,
      description,
      status,
    },
    taskEditing.id
  )
  const { data, status: statusCode } = resp
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data))
    yield put(hideModal())
  } else {
    yield put(updateTaskFailed(data))
  }
  yield delay(1000)
  yield put(hideLoading())
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload
  yield put(showLoading())
  const resp = yield call(deleteTask, id)

  const { data, status: statusCode } = resp
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id))
    yield put(hideModal())
  } else {
    yield put(deleteTaskFailed(data))
  }
  yield delay(1000)
  yield put(hideLoading())
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction)
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga) // takeEvery: chạy liên tục không tính số lần
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga)
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga)
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga)
}
export default rootSaga
