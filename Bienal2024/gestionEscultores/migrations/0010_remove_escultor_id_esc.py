# Generated by Django 4.2.16 on 2024-10-25 15:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gestionEscultores', '0009_alter_escultor_dni_esc_alter_escultor_telefono_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='escultor',
            name='ID_Esc',
        ),
    ]
