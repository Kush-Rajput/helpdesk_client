//It was Hard to write So it should be hard to Read!!

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../API/axios";

//current selected question
const quiz = JSON.parse(localStorage.getItem("quiz") || "{}");

//fetch all questions
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (page = 1, thunkAPI) => {
    try {
      const resp = await Axios.get(`/questions/?page=${page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

//fetch faqs
export const getFAQS = createAsyncThunk(
  "questions/getFAQS",
  async (thunkAPI) => {
    try {
      const resp = await Axios.get(`/faqs`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

// //fetch faqs
// export const getRelated = createAsyncThunk(
//   "questions/getFAQS",
//   async (thunkAPI) => {
//     try {
//       const resp = await Axios.get(`/faqs`);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.message);
//     }
//   }
// );
//fetch and update current seleceted question
export const getQuestion = createAsyncThunk(
  "questions/getQuestion",
  async (thunkAPI) => {
    try {
      const resp = await Axios.get(`/questions/${quiz?.id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

//serch through all question and return match
export const searchQuestions = createAsyncThunk(
  "questions/searchQuestions",
  async (term, thunkAPI) => {
    try {
      const resp = await Axios.get(`/search/${term}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

//post a question to db
export const postQuestions = createAsyncThunk(
  "questions/addnewQuestion",
  async (formData, thunkAPI) => {
    try {
      const responce = await Axios.post("/questions", formData);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

//update seleted question
export const patchQuestions = createAsyncThunk(
  "questions/patchQuestion",
  async (formData, thunkAPI) => {
    try {
      const responce = await Axios.patch(`/questions/${quiz?.id}`, formData);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

//update seleted question
export const patchSolution = createAsyncThunk(
  "questions/patchSolution",
  async ({ id, description, thunkAPI }) => {
    try {
      const responce = await Axios.patch(`/solutions/${id}`, {
        description: description,
      });
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
//bookmark a question
export const postBookmark = createAsyncThunk(
  "questions/postBookmark",
  async (formData, thunkAPI) => {
    try {
      const responce = await Axios.post("/bookmarks", formData);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
//post a solution to a question
export const postSolutions = createAsyncThunk(
  "questions/postSolution",
  async (formData, thunkAPI) => {
    try {
      const responce = await Axios.post("/solutions", formData);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
//get related questions(By tag)
export const getRelated = createAsyncThunk(
  "questions/getRelated",
  async ({ term, thunkAPI }) => {
    try {
      const responce = await Axios.get(`/filter/${term}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
//get related questions(By tag)
export const tagsFilter = createAsyncThunk(
  "questions/tagsFilter",
  async ({ term, thunkAPI }) => {
    try {
      const responce = await Axios.get(`/filter/${term}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
//vote for a solution
export const voteSolution = createAsyncThunk(
  "questions/voteSolution",
  async ({ id, formData, thunkAPI }) => {
    try {
      const responce = await Axios.patch(`/solutions/${id}`, formData);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

//initialstate values
const initialState = {
  page: 0,
  total_pages: 0,
  per_page: 0,
  allquestions: [],
  faqs: [],
  related: [],
  total: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  currentQuestion: {},
  currentSolution: {},
};

const quetionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reset: (state) => {
      //resets states
      state.isSuccess = false;
      state.isError = false;
    },
    upvote: (state, payload) => {
      const question = state.allquestions.find(
        (quiz) => quiz.id === payload.id
      );
      question.votes = question.votes + 1;
    },
    downvote: (state, payload) => {
      const question = state.allquestions.find(
        (quiz) => quiz.id === payload.id
      );
      question.votes = question.votes - 1;
    },
    set_current_quiz: (state, { payload }) => {
      state.currentQuestion = payload;
    },
    set_current_soln: (state, { payload }) => {
      state.currentSolution = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getQuestions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allquestions = action.payload.questions;
        state.total = action.payload.count;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFAQS.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFAQS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqs = action.payload;
      })
      .addCase(getFAQS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentQuestion = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchQuestions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allquestions = action.payload.questions;
        state.total = action.payload.count;
      })
      .addCase(searchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postBookmark.pending, (state, action) => {
        //  state.isLoading = true;
      })
      .addCase(postBookmark.fulfilled, (state, action) => {
        // console.log(action);
        // state.isSuccess = true;
        // state.isLoading = false;
      })
      .addCase(postBookmark.rejected, (state, action) => {
        //state.isLoading = false;
        //  state.isError = true;
        state.message = action.payload;
      })
      .addCase(postSolutions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postSolutions.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(postSolutions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(patchQuestions.pending, (state, action) => {
        //state.isLoading = true;
      })
      .addCase(patchQuestions.fulfilled, (state, action) => {
        //state.isSuccess = true;
        //state.isLoading = false;
      })
      .addCase(patchQuestions.rejected, (state, action) => {
        //state.isLoading = false;
        //state.isError = true;
        state.message = action.payload;
      })
      .addCase(postQuestions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postQuestions.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(postQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payloaQuestions;
      })
      .addCase(getRelated.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRelated.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.related = action.payload.questions;
      })
      .addCase(getRelated.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payloaQuestions;
      })
      .addCase(tagsFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(tagsFilter.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.allquestions = action.payload.questions;
      })
      .addCase(tagsFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payloaQuestions;
      })
      .addCase(voteSolution.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(voteSolution.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // state.currentQuestion = action.payload;
      })
      .addCase(voteSolution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //state.message = action.payloaQuestions;
      })
      .addCase(patchSolution.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(patchSolution.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // state.currentQuestion = action.payload;
      })
      .addCase(patchSolution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //state.message = action.payloaQuestions;
      });
  },
});

export const { upvote, downvote, reset, set_current_quiz, set_current_soln } =
  quetionsSlice.actions;
export default quetionsSlice.reducer;
