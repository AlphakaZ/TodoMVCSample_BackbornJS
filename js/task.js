const TaskModel = Backbone.Model.extend({//個々のタスクモデル
    defaults:{//デフォルト値
        "title": "title",//タスク名
        "clear_flag": false//クリアしたかどうかのフラグ
    },
    initialize: function(attrs){//コンストラクタ
        console.log(JSON.stringify(this));
    },
    
    validate: function(attrs){//引数チェック
        if(attrs.text.length===0){
            return "タイトルが入力されていません";
        }
    },

    // これが呼ばれたらでーたを反転する
    toggle: function(){
        this.save({
            clear_flag = !this.get("clear_flag")
        });
    }
});

// コレクションの宣言
const TaskCollection = Backbone.Collection.extend({
    model: TaskModel
});

const EVENT_SUBMITTED = 'submitted';
const EVENT_TASK_DELETED ='deleted';

const EVENT_TASK_CLEARED = 'cleared';
const EVENT_TASK_UNCLEARED = 'uncleared';

const EVENT_SELECT_ALL = 'select_all';


const ParentView = Backbone.View.extend({
    initialize:function(){
        this.taskCollection = new TaskCollection();//data
        this.addTaskView = new AddTaskView();//Input field
        this.taskListView = new TaskListView({collection: this.taskCollection});//list
        
        this.optionView = new OptionView();
        const self = this;//thisを別変数に保存し、ネスト先でも参照化にする

        this.addTaskView.on(EVENT_SUBMITTED,function(value){
            const model = new TaskModel({
                title: value
            });
        });
        this.optionView.on(EVENT_SELECT_ALL,function(value){
            self.taskCollection.each(function(task){
                task.set({"checked":value});
            });
            console.log("Check All Task");
        })
    }
});

// 入力フォーム
const AddTaskView = Backbone.View.extend({
    el: '#main_task',

    events:{
        "keydown #title-form" : "onSubmitted",
    },

    //エンターキーが押された時の反応
    onSubmitted: function(e){
        if(e.which === 13){
            this.trigger(EVENT_SUBMITTED, $('#title-form').val());//トリガー発火
            $('#title-form').val("");
        }
    }
});

// オプション操作を行うフォーム
const OptionView = Backbone.View.extend({
    el: '#option-checkbox',

    events:{
        "change" : "onClicked"
    },

    onClicked: function(e){
        var value = $('#select-all').prop("checked");
        this.trigger(EVENT_SELECT_ALL,value);
    }
});

const TaskListView = Backbone

// タスク一覧のリスト
const TaskListView = Backbone.View.extend({
    el: '#sub-content',
    defaults:{//デフォルト値
        collection: new TaskCollection()
    },
    initialize: function(){
        //記述しなくても自動でいろいろ設定してくれる
    },

    onUpdated:function(){

    }
});

const TaskView = Backbone.View.extend({
    el: '.task',

    events:{
        "click .deletebutton":"deletetask",
        "toggle .togglebutton":"toggletask",
    },

    deletetask:function(){

    },

    toggletask:function(){
        this->get("model");
    }
});