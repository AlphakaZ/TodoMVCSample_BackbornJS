const TaskModel = Backbone.Model.extend({
    defaults:{
        "title": "title",
        "checked": false
    },
    initialize: function(attrs){
        console.log(JSON.stringify(this));
    },
    validate: function(attrs){
        if(attrs.text.length===0){
            return "タイトルが入力されていません";
        }
    },

    toggle: function(){
        this.save({
            completed: !this.get('completed')
        });
    }
});
const TaskCollection = Backbone.Collection.extend({
    model: TaskModel
});

const EVENT_SUBMITTED = 'submitted';
const EVENT_TASK_DELETED ='deleted';
const EVENT_SELECT_ALL = 'select_all';

//メイン
const ParentView = Backbone.View.extend({
    initialize:function(){
        this.taskCollection = new TaskCollection();
        this.tasksView = new TasksView({collection: this.taskCollection});
        this.addTaskView = new AddTaskView();

        this.selectAllView = new SelectAllView();
        const self = this;
        this.addTaskView.on(EVENT_SUBMITTED,function(value){
            const model = new TaskModel({
                title: value
            });
            self.taskCollection.add(model);
        });
        this.selectAllView.on(EVENT_SELECT_ALL,function(value){
            self.taskCollection.each(function(task){
                task.set({"checked":value});
            })
            console.log(JSON.stringify(self.taskCollection));
        });
    },
});

//追加するビュー
const AddTaskView = Backbone.View.extend({
    el: '#main_task',

    events:{
        "keydown" : "onSubmitted",
    },

    //内部で一度イベントを受け、外部に送信する処理を書く。
    onSubmitted: function(e){
        if(e.which === 13){
            this.trigger(EVENT_SUBMITTED, $('#title').val());
            $('#title').val("");
        }
    },

    // onClicked: function() {
    //     console.log("clicked");
        
    // }
});

//チェックを切り替えるビュー
const SelectAllView = Backbone.View.extend({
    el: '#select-all-checkbox',

    events:{
        "change" : "onClicked",
    },

    onClicked: function(e){
        // console.log(JSON.stringify(e));
        this.trigger(EVENT_SELECT_ALL,$('#select-all-checkbox').prop("checked"));
    }
});

//タスクを複数並べるビュー
const TasksView = Backbone.View.extend({
    el: '#sub-content',

    initialize:function(val){
        this.taskCollection = val.collection;
    },

    onUpdated:function(){
        // $('#sub-content').remove();
        // this.taskCollection.each(function(item){
        // });
        $('#sub-content').append("<tr><td>"+"テスト</td><td>えー</td>"+"</td></tr>");
    }
});

const SingleTaskView = Backbone.View.extend({
    

});

window.onload = function(){
    const parentView = new ParentView();
}