from flask import Blueprint, render_template, flash, redirect, request, flash, jsonify
from flask_login import current_user
from .models import Note
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        note = request.form.get('note')
        if len(note) < 2:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()

            request.close()
            flash('Note added!', category='success')

        return redirect('/')
    elif request.method == 'GET':
        if not current_user.is_authenticated:
            flash('You need to login before accessing this page!', 'error')
            return redirect('/login')
        else:
            return render_template('home.html', user=current_user)

@views.route('/delete-note/', methods=['POST'])
def deleteNote():
    print(1)
    note = json.loads(request.data)
    noteId = note['noteID']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
    else:
        print(note, noteId, 1)

    return jsonify({})
